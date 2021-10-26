const assert = require("chai").assert;

const database = (() => {
  const _database = {
    621: { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
    123: { id: 123, name: "FriendNo1", friends: [621, 631] },
    251: { id: 251, name: "SecondBestFriend", friends: [621] },
    631: { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
  };

  const getUser = (id) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        _database[id] ? res(_database[id]) : rej(new Error("not_found"));
      }, 300);
    });

  const listUserIDs = () => Promise.resolve([621, 123, 251, 631]);

  return { getUser, listUserIDs };
})();

const expected = [
  {
    id: 621,
    name: "XxDragonSlayerxX",
    friends: [
      { id: 123, name: "FriendNo1", friends: [621, 631] },
      { id: 251, name: "SecondBestFriend", friends: [621] },
      { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    ],
  },
  {
    id: 123,
    name: "FriendNo1",
    friends: [
      { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    ],
  },
  {
    id: 251,
    name: "SecondBestFriend",
    friends: [{ id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] }],
  },
  {
    id: 631,
    name: "ThirdWh33l",
    friends: [
      { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      { id: 123, name: "FriendNo1", friends: [621, 631] },
      { id: 251, name: "SecondBestFriend", friends: [621] },
    ],
  },
];

const validate = (result) => {
  console.info("==== Test2 Running =====");
  try {
    assert.deepEqual(result, expected);
    console.info("Test2 Passed");
  } catch (e) {
    console.error("Failed", e);
  }
};

// implement a method to create this result
const result = [];

const cachedFriends = {};

const getUserInfo = async (id) => {
  if (cachedFriends[id]) {
    return cachedFriends[id];
  }

  const userInfo = await database.getUser(id);
  cachedFriends[id] = userInfo;
  return userInfo;
}

const generateResult = async () => {
  const users = await database.listUserIDs();

  for (const id of users) {
    let name = "";
    const friends = [];
    const userInfo = await getUserInfo(id);

    if (userInfo) {
      if (userInfo.name && userInfo.name !== "") {
        name = userInfo.name;
      }

      if (userInfo.friends && userInfo.friends.length > 0) {
        for (let friend of userInfo.friends) {
          friends.push(await getUserInfo(friend));
        }
      }
    }

    result.push({
      id,
      name,
      friends
    });
  }
}

// At the end call validate
generateResult().
  finally(() =>
    validate(result));
