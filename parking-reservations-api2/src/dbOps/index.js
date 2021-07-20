const { getConnection } = require("./connection");

function findAll(collectionName, criteria = {}) {
  return new Promise(function (resolve, reject) {
    getConnection().collection(collectionName, function (err, col) {
      if (err) return reject(err);

      col.find(criteria).toArray(function (err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

function findOne(collectionName, criteria = {}) {
  return new Promise(function (resolve, reject) {
    getConnection().collection(collectionName, function (err, col) {
      if (err) return reject(err);

      col.findOne(criteria, function (err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

function updateDocument(collectionName, criteria, values) {
  return new Promise(function (resolve, reject) {
    var newvalues = { $set: { ...values } };
    getConnection()
      .collection(collectionName)
      .updateOne(criteria, newvalues, function (err, res) {
        if (err) return reject(err);
        resolve(res);
      });
  });
}

function getCount(collectionName, criteria = {}) {
  return new Promise(function (resolve, reject) {
    getConnection().collection(collectionName, function (err, col) {
      if (err) return reject(err);

      col.find(criteria).count(function (err, count) {
        if (err) return reject(err);
        resolve(count);
      });
    });
  });
}

module.exports = {
  findAll,
  findOne,
  updateDocument,
  getCount,
};
