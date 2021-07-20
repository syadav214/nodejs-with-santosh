const resolve = (req: any, mysqlConn: any) => {
  const connection = mysqlConn();
  connection.connect();

  const query = `UPDATE tblCases SET isResolved = 1 
  WHERE caseId = ${req.params.caseId} and officerId != 0;`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err: any, rows: any) => {
      connection.end();
      if (err) {
        reject('Not able to resolve the case');
      } else {
        resolve({ affectedRows: rows.affectedRows });
      }
    });
  });
};

export default resolve;
