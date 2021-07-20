const { getCount } = require("../dbOps");

async function getOccupiedCounts() {
  const occupied = await getCount("parkingSlots", { occupied: true });
  const total = await getCount("parkingSlots", {});
  return {
    occupiedPercent: (occupied * 100) / total,
    total,
  };
}

async function getReservedCounts() {
  const reservedOccupied = await getCount("parkingSlots", {
    reserved: true,
    occupied: true,
  });
  const reservedTotal = await getCount("parkingSlots", { reserved: true });
  return {
    reservedOccupied,
    reservedTotal,
  };
}

module.exports = {
  getOccupiedCounts,
  getReservedCounts,
};
