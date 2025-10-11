const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello from Frontend!');
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
