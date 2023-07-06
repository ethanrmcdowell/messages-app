const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const pool = mysql.createPool({
  host: "localhost", // MySQL host (usually localhost)
  port: 3306, // MySQL port (default is 3306)
  user: "root", // MySQL username
  password: process.env.MYSQL_PASSWORD, // MySQL password
  database: "sys", // MySQL database name
});

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
};

// on init get messages
app.get("/api/data", async (req, res) => {
  try {
    const connection = await getConnection();

    const results = await connection.promise().query("SELECT * FROM messages");

    connection.release();

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000...");
});
