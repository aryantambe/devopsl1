const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

// Health check
app.get('/health', (req, res) => res.send('Auth service healthy'));

// Simple in-memory users
const users = [
    { id: 1, username: 'test', password: 'test' }
];

// Login endpoint
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', userId: user.id });
});

// Optional default route
app.get('/', (req, res) => res.send('Hello from Auth!'));

app.listen(port, () => console.log(`Auth service listening on ${port}`));
