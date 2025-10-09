const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4002;
const SERVICE_NAME = process.env.SERVICE_NAME || 'user-service';

app.get('/', (req, res) => res.json({service: SERVICE_NAME, message: 'hello from user-service'}));

app.get('/profile', (req, res) => {
  res.json({id:1, name:'Demo User', email:'user@example.com'});
});

app.listen(PORT, ()=> console.log(`${SERVICE_NAME} listening on ${PORT}`));
