module.exports = req => {
  const connection = req.dbConn;
  connection.connect();

  const query = `UPDATE t_rechnungstermine SET date = '${
    req.body.date
  }',amount = ${req.body.amount}, billNumber = ${
    req.body.billNumber
  }, dueDate = '${req.body.dueDate}', Komment = '${
    req.body.comment
  }'  WHERE id= ${req.params.id};`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows, fields) => {
      if (err) {
        connection.end();
        reject('Not able to update bill');
      } else {
        connection.end();
        resolve({ affectedRows: rows.affectedRows });
      }
    });
  });
};
