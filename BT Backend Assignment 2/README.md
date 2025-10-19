# Week 2 Backend Assignment - Express API

## 📋 Project Overview

This is a complete Express.js API backend with static HTML frontend serving, custom middleware, error handling, and environment configuration.

**What This Project Teaches:**
- Building REST APIs with Express.js
- HTTP methods (GET, POST)
- URL parameters and dynamic routing
- Middleware (JSON parsing, custom logging)
- Error handling (400 Bad Request responses)
- Environment variables (.env)
- Serving static files
- Version control with Git

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed ([download](https://nodejs.org/))
- Git installed
- A code editor (VS Code, etc.)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/week2-node-express
   cd "BT Backend Assignment 2"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   You should see:
   ```
   ✅ Server running on http://localhost:3000
   📝 API Documentation:
      GET  http://localhost:3000/api           - Show API message
      POST http://localhost:3000/user          - Create user greeting
      GET  http://localhost:3000/user/:id      - Show user profile
   ```

---

## 📚 API Endpoints

### 1. **GET /api** - API Welcome Message
Returns the API message.

**Request:**
```bash
curl http://localhost:3000/api
```

**Response:**
```json
{
  "message": "My Week 2 API!"
}
```

---

### 2. **POST /user** - Create User Greeting
Accepts user data and returns a greeting.

**Request:**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Joseph","email":"joseph@example.com"}'
```

**Response (Success):**
```json
{
  "message": "Hello, Joseph!"
}
```

**Response (Missing Data - Error 400):**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Joseph"}'
```

```json
{
  "error": "Missing required fields",
  "required": ["name", "email"]
}
```

---

### 3. **GET /user/:id** - Get User Profile
Retrieves a user profile by ID.

**Request:**
```bash
curl http://localhost:3000/user/123
```

**Response:**
```json
{
  "message": "User 123 profile"
}
```

---

### 4. **GET /** - Static HTML Page
Serves your Profile page.

**Request:**
```bash
curl http://localhost:3000/
```

**Response:** HTML page from `Profile/index.html`

---

## 📝 Testing with Postman

### Setup Postman Collection

1. **Open Postman** ([download](https://www.postman.com/downloads/))

2. **Create GET /api Request**
   - Method: `GET`
   - URL: `http://localhost:3000/api`
   - Click **Send**

3. **Create POST /user Request**
   - Method: `POST`
   - URL: `http://localhost:3000/user`
   - Body → Raw → JSON:
     ```json
     {
       "name": "Joseph",
       "email": "joseph@example.com"
     }
     ```
   - Click **Send**

4. **Test Error Handling**
   - Send POST to `/user` with only `{"name": "Joseph"}`
   - You should get HTTP 400 error

5. **Create GET /user/:id Request**
   - Method: `GET`
   - URL: `http://localhost:3000/user/123`
   - Click **Send**

---

## 🔧 Project Structure

```
BT Backend Assignment 2/
├── app.js                  # Main Express application
├── .env                    # Environment variables (PORT)
├── .gitignore             # Git ignore file (hides node_modules, .env)
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependency versions
├── README.md              # This file
└── Profile/
    ├── index.html         # Frontend HTML
    ├── index.css          # Frontend styling
    ├── index.js           # Frontend JavaScript
    └── joseph.jpg         # Profile image
```

---

## 🎓 Key Concepts Explained

### 1. **Express Routes**
Routes define what happens when a specific URL is accessed.

```javascript
// GET request to /api
app.get('/api', (req, res) => {
    res.json({ message: 'My Week 2 API!' });
});

// POST request to /user
app.post('/user', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `Hello, ${name}!` });
});
```

### 2. **URL Parameters**
`:id` in the URL becomes a parameter you can access.

```javascript
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;  // Get from URL
    res.json({ message: `User ${userId} profile` });
});
```

### 3. **Middleware**
Functions that process requests before they reach routes.

```javascript
// JSON parsing middleware
app.use(express.json());

// Custom logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();  // Pass to next middleware/route
});
```

### 4. **Error Handling**
HTTP status codes tell the client if something went wrong.

```javascript
if (!name || !email) {
    return res.status(400).json({  // 400 = Bad Request
        error: 'Missing required fields'
    });
}
```

### 5. **Environment Variables**
Store sensitive config in `.env` (not in Git).

```javascript
require('dotenv').config();  // Load .env file
const PORT = process.env.PORT || 3000;  // Use PORT from .env
```

---

##🌳 Git & GitHub Setup

### Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Week 2 Express API"
```

### Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **New repository**
3. Name it: `week2-node-express`
4. Add description: "Week 2 Backend Assignment - Express API"
5. Click **Create repository**

### Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/yourusername/week2-node-express.git
git push -u origin main
```

---

## 📊 Bonus: Custom Request Logging Middleware

The app includes a custom middleware that logs all requests:

```javascript
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});
```

**Output example:**
```
[2025-10-19T23:39:20.311Z] GET /api
[2025-10-19T23:39:21.692Z] POST /user
[2025-10-19T23:39:22.176Z] GET /user/123
```

---

## ❓ Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Change `PORT` in `.env` to another number like 3001

### "Cannot find module 'express'"
- Run: `npm install`

### Routes return "File not found"
- Make sure `node app.js` is running
- Check that you're using `http://localhost:3000/api` (with `/api`)

### Express not restarting after changes
- Stop the server: `Ctrl + C`
- Start it again: `npm start`

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Guide](https://nodejs.org/docs/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [Git & GitHub Guide](https://guides.github.com/)

---

## ✅ Assignment Checklist

- [x] Express app created
- [x] GET / API message endpoint
- [x] POST /user endpoint with greeting
- [x] GET /user/:id endpoint  
- [x] JSON parsing middleware
- [x] Error handling (400 for missing data)
- [x] .env for PORT configuration
- [x] Static HTML page serving
- [x] Custom logging middleware
- [ ] Git initialized and pushed to GitHub

---

## 👨‍💻 Author
Joseph CreativeSon
Graphic Designer & Junior Developer

---

## 📄 License
ISC
