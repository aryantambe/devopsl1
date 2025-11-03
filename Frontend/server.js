const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/health', (req, res) => res.json({status: 'ok', app: 'bookhub-frontend'}));

app.listen(port, () => console.log(`Frontend server listening on ${port}`));
