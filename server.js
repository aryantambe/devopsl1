const express = require("express");
const app = express();

app.use(express.json());

// In-memory database (books)
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// ADD a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((b) => b.id !== bookId);
  res.status(204).send();
});

// CPU-intensive endpoint for scaling test
app.get("/cpu", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e7; i++) sum += i;
  res.send("CPU task completed");
});

app.listen(3000, () => console.log("📚 Bookstore backend running on port 3000"));
