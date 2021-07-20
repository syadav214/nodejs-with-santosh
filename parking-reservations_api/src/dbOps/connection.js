const dbConn = {
  connect: false,
  db: null,
  client: null,
};

const setConnection = (mongo) => {
  if (!dbConn.connect) {
    dbConn.connect = true;
    dbConn.client = mongo.client;
    dbConn.db = mongo.db;
  }
};

const getConnection = () => dbConn.db;

module.exports = {
  setConnection,
  getConnection,
};
