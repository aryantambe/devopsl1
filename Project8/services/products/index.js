const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

// Health check
app.get('/health', (req, res) => res.send('Products service healthy'));

// Sample in-memory products
let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 }
];

// Get all products
app.get('/api/products', (req, res) => res.json(products));

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

app.listen(port, () => console.log(`Products service listening on ${port}`));
