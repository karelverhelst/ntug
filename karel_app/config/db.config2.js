// import mysql
var mysql = require('mysql');

// create a new connection pool
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Netapp12",
  database: "karel_app2"
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
