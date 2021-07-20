const ObjectId = require("mongodb").ObjectID;
const { findAll, findOne, updateDocument } = require("../dbOps");
const { getOccupiedCounts, getReservedCounts } = require("../utils/capacity");
const msIn15Mins = 60000 * 15;

async function getAvailableSlots() {
  const capacity = await getOccupiedCounts();
  const _available = await findAll("parkingSlots", { registered: false });

  if (capacity.occupiedPercent >= 50) {
    const _notOccupiedTillGivenTime = await findAll("parkingSlots", {
      registered: true,
      occupied: false,
    });

    if (_notOccupiedTillGivenTime.length > 0) {
      _available.push(..._notOccupiedTillGivenTime);
    }
  }

  return {
    count: _available.length,
    result: _available,
  };
}

async function getOccupiedSlots() {
  const _occupied = await findAll("parkingSlots", { occupied: true });

  return {
    count: _occupied.length,
    result: _occupied,
  };
}

async function registerParkingSlotWrapper(userId) {
  async function registerParkingSlot() {
    const registered = {
      status: false,
      message: "",
      parkingNumber: null,
    };

    const user = await findOne("users", { _id: ObjectId(userId) });
    //if user is not valid or user already registered a parking spot then he can't register
    if (user === null || (user !== null && user.parkingId !== null)) {
      registered.message =
        user === null
          ? "Not a valid user"
          : "User has already occupied a parking spot";
      return registered;
    }

    let criteria = {
      registered: false,
      reserved: false,
      registrationLock: null,
      reservedCategoryLock: null,
    };

    const reservedCounts = await getReservedCounts();
    //if user is of reservedCategory and reserved parking slot available then he will register for the same
    if (
      user.reservedCategory &&
      reservedCounts.reservedTotal > reservedCounts.reservedOccupied
    ) {
      criteria.reserved = true;
    }

    let _available = await findOne("parkingSlots", criteria);
    if (_available === null) {
      const capacity = await getOccupiedCounts();

      // if no slot available and occupiedPercent is more than/equal to 50 then get all registered slots which are registered, but not occupied yet
      if (!criteria.reserved && capacity.occupiedPercent >= 50) {
        _available = await findOne("parkingSlots", {
          registered: true,
          occupied: false,
        });
      } else {
        // else no slot available then get all registered slots which are not occupied yet with 30 mins wait time
        _available = await findOne("parkingSlots", {
          registered: true,
          occupied: false,
          tillTimeUserCanOccupy: { $lt: new Date().getTime() + msIn15Mins },
        });
      }
    }

    if (_available === null) {
      registered.message = "No parking spot available.";
      return registered;
    }

    // if user is of reservedCategory and no reserved slots available then lock the parking spot so than general user cannot register
    if (user.reservedCategory && !criteria.reserved) {
      await updateDocument(
        "parkingSlots",
        { _id: ObjectId(_available._id), userId: null },
        {
          reservedCategoryLock: true,
        }
      );
    } else {
      // lock the parking as soon as one slot available so that other user cannot register on it
      await updateDocument(
        "parkingSlots",
        { _id: ObjectId(_available._id), userId: null },
        {
          registrationLock: true,
        }
      );
    }

    try {
      // register a parking slot with 15mins wait time
      const parkingUpdate = await updateDocument(
        "parkingSlots",
        { _id: ObjectId(_available._id), userId: null },
        {
          userId: user._id,
          registered: true,
          occupied: false,
          reservedCategoryLock: null,
          registrationLock: null,
          tillTimeUserCanOccupy: new Date().getTime() + msIn15Mins, // 15 mins
        }
      );

      if (parkingUpdate.result.nModified == 0) {
        registered.message =
          "ParkingSlots updated failed while registering parking spot.";
        return registered;
      }

      // update parking number against the user
      const userUpdate = await updateDocument(
        "users",
        { _id: ObjectId(userId) },
        {
          parkingId: _available._id,
        }
      );

      if (userUpdate.result.nModified == 0) {
        // reverting registered parkingSlot
        revertParkingSlots(_available);
        registered.message =
          "User update faile while registering parking spot.";
        return registered;
      }

      registered.status = true;
      registered.parkingNumber = _available._id;
      registered.message = "Parking slot registered for the user.";
    } catch (err) {
      registered.message = "Error occured while registering parking spot.";
    }

    return registered;
  }

  async function revertParkingSlots(parkingSlot) {
    await updateDocument(
      "parkingSlots",
      { _id: ObjectId(parkingSlot._id) },
      {
        userId: null,
        registered: false,
        occupied: false,
        reservedCategoryLock: null,
        registrationLock: null,
        tillTimeUserCanOccupy: null,
      }
    );
  }

  return {
    registered: await registerParkingSlot(),
  };
}

async function occupyParkingSlotWrapper(userId) {
  async function occupyParkingSlot() {
    const occupy = {
      status: false,
      message: "",
    };

    const user = await findOne("users", {
      _id: ObjectId(userId),
      parkingId: { $ne: null },
    });

    if (user === null) {
      occupy.message = "Not a valid user.";
      return occupy;
    }

    const parkingSlot = await findOne("parkingSlots", {
      _id: ObjectId(user.parkingId),
      tillTimeUserCanOccupy: { $gt: new Date().getTime() },
    });

    if (parkingSlot === null) {
      // if user late to occupy the slot then free the slot
      await updateDocument(
        "parkingSlots",
        { _id: ObjectId(user.parkingId) },
        {
          registered: false,
          tillTimeUserCanOccupy: null,
        }
      );
      occupy.message = "Late to occupy the slot.";
      return occupy;
    }

    try {
      const parkingUpdate = await updateDocument(
        "parkingSlots",
        { _id: ObjectId(user.parkingId) },
        {
          occupied: true,
          tillTimeUserCanOccupy: null,
        }
      );

      if (parkingUpdate.result.nModified == 0) {
        occupy.message =
          "ParkingSlots updated failed while registering parking spot.";
        return occupy;
      }

      occupy.status = true;
      occupy.message = "Occupied the slot.";
    } catch (err) {
      occupy.message = "Error occured while occupying parking spot.";
    }
    return occupy;
  }

  return {
    occupied: await occupyParkingSlot(),
  };
}

async function leaveParkingSlotWrapper(userId) {
  async function leaveParkingSlot() {
    const leave = {
      status: false,
      message: "",
    };

    const user = await findOne("users", {
      _id: ObjectId(userId),
    });

    if (user === null) {
      leave.message = "Not a valid user.";
      return leave;
    }

    try {
      const parkingUpdate = await updateDocument(
        "parkingSlots",
        { _id: ObjectId(user.parkingId) },
        {
          userId: null,
          registered: false,
          occupied: false,
          tillTimeUserCanOccupy: null,
        }
      );

      if (parkingUpdate.result.nModified == 0) {
        leave.message =
          "ParkingSlots update failed while leaving parking spot.";
        return leave;
      }

      // remove parkingId against the user
      const userUpdate = await updateDocument(
        "users",
        { _id: user._id },
        {
          parkingId: null,
        }
      );

      if (userUpdate.result.nModified == 0) {
        // reverting left parkingSlot
        revertParkingSlot(user);
        leave.message = "User updated failed while leaving parking spot.";
        return leave;
      }

      leave.status = true;
      leave.message = "Left the slot.";
    } catch (err) {
      leave.message = "Error occured while leaving parking spot.";
    }
    return leave;
  }

  async function revertParkingSlot(user) {
    await updateDocument(
      "parkingSlots",
      { _id: ObjectId(user.parkingId) },
      {
        userId: user._id,
        registered: true,
        occupied: true,
      }
    );
  }

  return {
    leave: await leaveParkingSlot(),
  };
}

module.exports = {
  getAvailableSlots,
  getOccupiedSlots,
  registerParkingSlot: registerParkingSlotWrapper,
  occupyParkingSlot: occupyParkingSlotWrapper,
  leaveParkingSlot: leaveParkingSlotWrapper,
};
