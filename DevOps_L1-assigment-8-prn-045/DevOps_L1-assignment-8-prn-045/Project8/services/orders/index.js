const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

// Health check
app.get('/health', (req, res) => res.send('Orders service healthy'));

// Sample in-memory orders
let orders = [
    { id: 1, userId: 1, productId: 2, quantity: 1 },
    { id: 2, userId: 2, productId: 1, quantity: 2 }
];

// Get all orders
app.get('/api/orders', (req, res) => res.json(orders));

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
});

app.listen(port, () => console.log(`Orders service listening on ${port}`));
