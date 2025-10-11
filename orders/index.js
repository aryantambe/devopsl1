const express = require('express');
const app = express();
const PORT = 8082;

app.get('/', (req, res) => {
  res.send('Hello from Orders Service!');
});

app.listen(PORT, () => console.log(`Orders running on port ${PORT}`));
