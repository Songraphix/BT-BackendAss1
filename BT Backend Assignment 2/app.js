const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

app.get('/api', (req, res) => {
    res.json({ message: 'My Week 2 API!' });
});

app.post('/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Missing required fields',
            required: ['name', 'email']
        });
    }

    res.json({ message: `Hello, ${name}!` });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User ${userId} profile` });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Profile', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'Profile')));

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   GET  http://localhost:${PORT}/api           - Show API message`);
    console.log(`   POST http://localhost:${PORT}/user          - Create user greeting`);
    console.log(`   GET  http://localhost:${PORT}/user/:id      - Show user profile`);
});
