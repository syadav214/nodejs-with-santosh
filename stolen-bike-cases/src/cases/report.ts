const report = (req: any, mysqlConn: any) => {
  const connection = mysqlConn();
  connection.connect();

  const query = `INSERT INTO tblCases (bikeOwnerName)
   VALUES ('${req.body.bikeOwnerName}');`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err: any, rows: any) => {
      connection.end();
      if (err) {
        reject('Not able to report a case');
      } else {
        resolve({ affectedRows: rows.affectedRows, caseId: rows.insertId });
      }
    });
  });
};

export default report;
