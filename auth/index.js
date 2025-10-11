const express = require('express');
const app = express();
const PORT = 8081;

app.get('/', (req, res) => {
  res.send('Hello from Auth Service!');
});

app.listen(PORT, () => console.log(`Auth running on port ${PORT}`));
