# 🎯 Quick Reference Card

## **How to Run**
```bash
npm start
```
Server runs at `http://localhost:3000`

---

## **Your 4 API Endpoints**

### **1️⃣ GET /api** - Welcome
```
Request:  curl http://localhost:3000/api
Response: {"message":"My Week 2 API!"}
```

### **2️⃣ POST /user** - User Greeting  
```
Request:  curl -X POST http://localhost:3000/user \
          -H "Content-Type: application/json" \
          -d '{"name":"Joseph","email":"joseph@test.com"}'
Response: {"message":"Hello, Joseph!"}
```

### **3️⃣ GET /user/:id** - Profile
```
Request:  curl http://localhost:3000/user/123
Response: {"message":"User 123 profile"}
```

### **4️⃣ GET /** - Static Page
```
Request:  curl http://localhost:3000/
Response: HTML from Profile/index.html
```

---

## **Error Response**
```
Request:  POST /user with only {"name":"Joseph"}
Status:   400 Bad Request
Response: {"error":"Missing required fields","required":["name","email"]}
```

---

## **File Structure**
```
app.js             - Main server code (97 lines)
.env               - Configuration (PORT=3000)
package.json       - Dependencies (express, dotenv)
Profile/           - Static website files
├── index.html
├── index.css
├── index.js
└── joseph.jpg
```

---

## **Key Code Concepts**

### **Routing**
```javascript
app.get('/path', (req, res) => {
    res.json({ data: 'response' });
});

app.post('/path', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}!` });
});
```

### **URL Parameters**
```javascript
// /user/:id  →  req.params.id
app.get('/user/:id', (req, res) => {
    console.log(req.params.id);  // "123" or "john"
});
```

### **Validation**
```javascript
if (!req.body.name) {
    return res.status(400).json({ error: 'Name required' });
}
```

### **Middleware**
```javascript
app.use(express.json());  // Parse JSON
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();  // Don't forget this!
});
```

---

## **HTTP Methods & Status Codes**

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | `/api`, `/user/1` |
| POST | Create data | `/user` with JSON body |
| PUT | Update all | `/user/1` with new data |
| DELETE | Remove | `/user/1` |

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

---

## **Testing (Postman)**

1. **New Request** → Enter URL
2. **Method** → Select GET/POST/etc
3. **Body** (for POST) → Raw → JSON
4. **Send** → View Response

---

## **Debugging**

**Q: Server won't start?**
```bash
# Check if port is in use, or change PORT in .env
PORT=3001
```

**Q: "Cannot find module"?**
```bash
npm install
```

**Q: Middleware not running?**
```javascript
// Make sure you call next()!
app.use((req, res, next) => {
    console.log('test');
    next();  // ← Required!
});
```

---

## **Environment Variables**

### **.env file:**
```
PORT=3000
DATABASE_URL=mongodb://...
API_KEY=secret123
```

### **In app.js:**
```javascript
require('dotenv').config();
const PORT = process.env.PORT;  // 3000
```

---

## **Git Commands**

```bash
git status              # Check changes
git add .               # Stage changes
git commit -m "msg"     # Commit changes
git push                # Push to GitHub
git pull                # Get latest from GitHub
```

---

## **Deployment Checklist**

- [ ] All routes tested
- [ ] Error handling working
- [ ] .env file created
- [ ] .gitignore excludes secrets
- [ ] Code commented
- [ ] Pushed to GitHub
- [ ] README included
- [ ] No console errors

---

## **What to Study Next**

1. **Databases** - Store actual data (MongoDB)
2. **Authentication** - User login (JWT)
3. **Validation** - Check data formats
4. **Security** - Protect your API
5. **Testing** - Automated tests
6. **Deployment** - Host on server

---

## **My Cheat Sheet**

Save this for quick reference while coding!

```javascript
// Express setup
const express = require('express');
const app = express();
app.use(express.json());

// GET route
app.get('/path', (req, res) => {
    res.json({ message: 'hello' });
});

// POST route
app.post('/path', (req, res) => {
    const data = req.body;
    if (!data.name) {
        return res.status(400).json({ error: 'Need name' });
    }
    res.json({ received: data });
});

// Dynamic route
app.get('/user/:id', (req, res) => {
    res.json({ userId: req.params.id });
});

// Start server
app.listen(3000, () => console.log('Server ready'));
```

---

**Print this page and keep it on your desk!** 📋
