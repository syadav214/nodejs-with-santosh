import * as mysql from 'mysql';

export default function mysqlConn() {
  return mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBNAME
  });
}
