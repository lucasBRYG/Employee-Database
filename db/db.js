const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "V@45fore%9RUop",
  database: "employee_DB"
});

module.exports = connection;