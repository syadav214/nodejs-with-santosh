module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  const query =
    'SELECT MIN(Year(date)) as minYear,MAX(Year(date)) as maxYear FROM t_rechnungstermine ';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to retrive years');
      } else {
        connection.end();
        resolve(rows);
      }
    });
  });
};
