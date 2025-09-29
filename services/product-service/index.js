const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4003;
const SERVICE_NAME = process.env.SERVICE_NAME || 'product-service';

app.get('/', (req, res) => res.json({service: SERVICE_NAME, message: 'hello from product-service'}));

app.get('/products', (req, res) => {
  res.json([ { id: 1, name: 'Widget', price: 9.99 }, { id: 2, name: 'Gadget', price: 12.5 } ]);
});

app.listen(PORT, ()=> console.log(`${SERVICE_NAME} listening on ${PORT}`));
