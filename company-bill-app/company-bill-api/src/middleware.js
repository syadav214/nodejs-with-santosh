module.exports = (req, res, next) => {
  if (
    req.headers['x-api-key'] === false ||
    req.headers['x-api-key'] !== process.env.APIKEY
  ) {
    res.status(401).send({ success: false, body: 'Invalid token' });
  } else {
    const mysql = require('mysql');
    req.dbConn = mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPWD,
      database: process.env.DBNAME
    });
    next();
  }
};
