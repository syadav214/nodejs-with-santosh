module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  const query = 'SELECT id,project_ID,name,city,country,contactEmail FROM t_firmen ORDER BY name';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to retrive company details');
      } else {
        connection.end();
        resolve(rows);
      }
    });
  });
};
