const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.get('/health', (req, res) => res.send('Users service healthy'));
app.get('/', (req, res) => res.send('Hello from Users!'));

app.listen(port, () => console.log(`Users service listening on ${port}`));


// GET all users
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ]);
});

// GET single user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    res.json({ id: userId, name: `User ${userId}` });
});
