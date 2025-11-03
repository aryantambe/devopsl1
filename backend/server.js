import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "bookhub"
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

app.get("/", (req, res) => {
  res.send("📚 Welcome to BookHub Backend!");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  db.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Book added successfully!" });
  });
});

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
