const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4004;
const SERVICE_NAME = process.env.SERVICE_NAME || 'order-service';

app.get('/', (req, res) => res.json({service: SERVICE_NAME, message: 'hello from order-service'}));

app.post('/order', async (req, res) => {
  // demo: create fake order
  res.json({orderId: Math.floor(Math.random()*10000), status: 'created', details: req.body});
});

app.listen(PORT, ()=> console.log(`${SERVICE_NAME} listening on ${PORT}`));
