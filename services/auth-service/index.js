const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4001;
const SERVICE_NAME = process.env.SERVICE_NAME || 'auth-service';

app.get('/', (req, res) => res.json({service: SERVICE_NAME, message: 'hello from auth-service'}));

app.post('/token', (req, res) => {
  const token = { access_token: 'demo-token-' + Math.random().toString(36).slice(2,10), expires_in: 3600, service: SERVICE_NAME };
  res.json(token);
});

app.get('/validate', (req, res) => {
  const token = req.header('authorization');
  if (!token) return res.status(401).json({valid:false});
  const valid = token.startsWith('Bearer demo-token-');
  res.json({valid});
});

app.listen(PORT, ()=> console.log(`${SERVICE_NAME} listening on ${PORT}`));
