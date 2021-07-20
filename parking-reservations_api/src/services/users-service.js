const { findAll } = require("../dbOps");

async function getUsers() {
  const users = await findAll("users");
  return {
    count: users.length,
    result: users,
  };
}

module.exports = {
  getUsers,
};
