const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbname,
});

module.exports = db;
