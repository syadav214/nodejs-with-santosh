import mysqlConn from '../mysqlConn';
const connection = mysqlConn();
connection.connect();

export async function auto_assignment() {
  while (true) {
    await findAndAssign();
    await sleep(5000);
  }
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export async function findAndAssign() {
  let success: boolean = true;
  try {
    // Get unassigned cases
    const rowsCases: any = await findUnassignedCases();
    if (rowsCases.length > 0) {
      // Get free officers for NUMBER of cases
      const rowsOfficers: any = await findFreeOfficers(rowsCases.length);
      if (rowsOfficers.length > 0) {
        for (let i = 0; i < rowsOfficers.length; i++) {
          await assignOfficerToCase(
            rowsOfficers[i].officerId,
            rowsCases[i].caseId
          );
        }
      } else {
        console.log('No free officer(s) available for assignment');
      }
    } else {
      console.log('No cases available for assignment');
    }
  } catch (err) {
    console.log(err);
    success = false;
  }
  return success;
}

function findUnassignedCases() {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT caseId FROM tblCases WHERE officerId = 0;',
      (err: any, rows: any) => {
        if (err) {
          reject('Not able to fetch unassigned case(s)');
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function findFreeOfficers(caseCount: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT officerId  FROM tblOfficers WHERE officerId NOT IN (SELECT officerId FROM tblCases WHERE isResolved = 0) LIMIT ${caseCount};`,
      (err: any, rows: any) => {
        if (err) {
          reject('Not able to fetch free officer(s)');
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function assignOfficerToCase(officerId: number, caseId: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE tblCases SET officerId = ${officerId} WHERE caseId = ${caseId}; `,
      (err: any) => {
        if (err) {
          reject(`Not able to update officer for caseId: ${caseId}`);
        } else {
          console.log(
            `Officer Id: ${officerId} assigned for caseId: ${caseId}`
          );
          resolve(true);
        }
      }
    );
  });
}
