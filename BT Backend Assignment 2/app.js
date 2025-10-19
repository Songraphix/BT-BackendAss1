// ============================================
// BACKEND DEVELOPMENT - WEEK 2 ASSIGNMENT
// Express API with Routes, Middleware & Error Handling
// ============================================

// 1. IMPORT REQUIRED MODULES
// ============================================
// Why? Express is the framework we're building our API on
// dotenv allows us to use environment variables from .env file
const express = require('express');
const path = require('path');
require('dotenv').config(); // Load .env file into process.env

// 2. CREATE EXPRESS APP
// ============================================
const app = express();

// 3. MIDDLEWARE SETUP
// ============================================
// This tells Express to parse incoming JSON data
// Why? When someone sends POST data, we need to convert it to JavaScript objects
app.use(express.json());

// BONUS: Custom logging middleware
// This runs on EVERY request to log information
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    // Call next() to pass control to the next middleware/route
    next();
});

// 4. ROUTES - Define API routes BEFORE static files
// ============================================

// ROUTE 1: GET / - Show "My Week 2 API!"
// When someone visits http://localhost:3000/api/
app.get('/api', (req, res) => {
    // res.json() sends JSON response
    res.json({ message: 'My Week 2 API!' });
});

// ROUTE 2: POST /user - Accept name and email
// When someone POSTs data to http://localhost:3000/user
app.post('/user', (req, res) => {
    // req.body contains the JSON data sent by the client
    const { name, email } = req.body;

    // ERROR HANDLING: Check if required fields are missing
    // 400 = Bad Request (client sent invalid data)
    if (!name || !email) {
        return res.status(400).json({
            error: 'Missing required fields',
            required: ['name', 'email']
        });
    }

    // Success: Respond with greeting
    res.json({ message: `Hello, ${name}!` });
});

// ROUTE 3: GET /user/:id - Show user profile
// :id is a parameter that changes based on the URL
// Examples: /user/1, /user/123, /user/john
app.get('/user/:id', (req, res) => {
    const userId = req.params.id; // Get the id from URL
    res.json({ message: `User ${userId} profile` });
});

// Serve Profile HTML at root /
// When someone visits http://localhost:3000, show the Profile page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Profile', 'index.html'));
});

// Serve static files from the Profile folder
// Why? This makes your Profile CSS/JS/images available
app.use(express.static(path.join(__dirname, 'Profile')));

// 5. ERROR HANDLING - 404 Not Found
// ============================================
// This catches any route that wasn't defined above
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// 6. START SERVER
// ============================================
// Get PORT from .env file, default to 3000 if not set
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   GET  http://localhost:${PORT}/api           - Show API message`);
    console.log(`   POST http://localhost:${PORT}/user          - Create user greeting`);
    console.log(`   GET  http://localhost:${PORT}/user/:id      - Show user profile`);
});
