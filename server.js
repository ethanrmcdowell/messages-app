const express = require("express");
const mysql = require("mysql2");

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

// route for handling requests from the Angular client
app.get("/api/message", (req, res) => {
  res.json({ message: "WOWWW" });
});

const pool = mysql.createPool({
  host: "localhost", // MySQL host (usually localhost)
  port: 3306, // MySQL port (default is 3306)
  user: "root", // MySQL username
  password: "rootroot", // MySQL password
  database: "messages", // MySQL database name
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

app.get("/users", async (req, res) => {
  try {
    const connection = await getConnection();

    // Execute a query
    connection.query("SELECT * FROM users", (err, results) => {
      connection.release(); // Release the connection

      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json(results);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000...");
});
