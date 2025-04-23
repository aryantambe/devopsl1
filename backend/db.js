const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g., "localhost" or AWS RDS host
  user: process.env.DB_USER,     // your MySQL username
  password: process.env.DB_PASS, // your MySQL password
  database: process.env.DB_NAME, // your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;