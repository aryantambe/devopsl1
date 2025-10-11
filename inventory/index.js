const express = require('express');
const app = express();
const PORT = 8083;

app.get('/', (req, res) => {
  res.send('Hello from Inventory Service!');
});

app.listen(PORT, () => console.log(`Inventory running on port ${PORT}`));
