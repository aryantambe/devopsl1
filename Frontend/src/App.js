import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "" });

  const fetchBooks = async () => {
    const res = await axios.get(`${backendURL}/books`);
    setBooks(res.data);
  };

  const addBook = async (e) => {
    e.preventDefault();
    await axios.post(`${backendURL}/books`, form);
    setForm({ title: "", author: "" });
    fetchBooks();
  };

  useEffect(() => { fetchBooks(); }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Poppins", marginTop: "50px" }}>
      <h1>📖 BookHub</h1>
      <form onSubmit={addBook}>
        <input
          placeholder="Book title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((b, i) => (
          <li key={i}>
            <strong>{b.title}</strong> by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
