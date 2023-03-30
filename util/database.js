const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  databse: "node-complete",
  password: "2232824aZ",
});

module.exports = pool.promise();
