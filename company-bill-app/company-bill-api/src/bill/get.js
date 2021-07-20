module.exports = req => {
  const connection = req.dbConn;
  connection.connect();
  let query = '';

  if (req.params.id) {
    query = `SELECT DATE_FORMAT(date, "%Y-%m-%d") as date,amount,billNumber,DATE_FORMAT(dueDate, "%Y-%m-%d") as dueDate,Komment as comment FROM t_rechnungstermine WHERE id = ${
      req.params.id
    };`;
  } else {
    query =
      'SELECT B.id,C.name,DATE_FORMAT(B.date, "%Y.%m.%d") as date,B.amount,B.billNumber,B.dueDate,B.Komment as comment FROM t_rechnungstermine B JOIN t_firmen C ON B.company_ID = C.id ';

    if (req.params.all === '0') {
      if (req.params.month !== '0' && req.params.year === '0') {
        // single month - all year
        query += ` WHERE MONTH(B.date) = ${req.params.month}`;
      } else if (req.params.month === '0' && req.params.year !== '0') {
        // single year - all month
        query += ` WHERE YEAR(B.date) = ${req.params.year}`;
      } else if (req.params.month !== '0' && req.params.year !== '0') {
        // single month & year
        query += ` WHERE YEAR(B.date) = ${
          req.params.year
        } AND MONTH(B.date) = ${req.params.month} `;
      }
    }
    query += ` ORDER BY B.date `;
  }

  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to retrive bill details');
      } else {
        connection.end();
        resolve(rows);
      }
    });
  });
};
