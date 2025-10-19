# 🧪 Testing Guide - Week 2 Express API

## **Quick Start**

1. **Start the server:**
   ```bash
   npm start
   ```

2. **See in console:**
   ```
   ✅ Server running on http://localhost:3000
   📝 API Documentation:
      GET  http://localhost:3000/api           - Show API message
      POST http://localhost:3000/user          - Create user greeting
      GET  http://localhost:3000/user/:id      - Show user profile
   ```

3. **Server is ready!** Test the endpoints below.

---

## **Testing Method 1: Using Postman (Recommended)**

### **Download Postman**
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

### **Test GET /api**
1. Click **New** → **Request**
2. Set **Method** to `GET`
3. Set **URL** to `http://localhost:3000/api`
4. Click **Send**

**Expected Response:**
```json
{
  "message": "My Week 2 API!"
}
```

### **Test POST /user (Valid Data)**
1. Click **New** → **Request**
2. Set **Method** to `POST`
3. Set **URL** to `http://localhost:3000/user`
4. Click **Body** tab
5. Select **Raw** and **JSON**
6. Paste this:
   ```json
   {
     "name": "Joseph",
     "email": "joseph@example.com"
   }
   ```
7. Click **Send**

**Expected Response:**
```json
{
  "message": "Hello, Joseph!"
}
```

### **Test POST /user (Missing Data - Error)**
1. Same steps as above, but in Body paste:
   ```json
   {
     "name": "Joseph"
   }
   ```
2. Click **Send**

**Expected Response (HTTP 400):**
```json
{
  "error": "Missing required fields",
  "required": ["name", "email"]
}
```

Notice the **Status** shows `400 Bad Request`

### **Test GET /user/:id**
1. Click **New** → **Request**
2. Set **Method** to `GET`
3. Set **URL** to `http://localhost:3000/user/123`
4. Click **Send**

**Expected Response:**
```json
{
  "message": "User 123 profile"
}
```

Try different URLs:
- `http://localhost:3000/user/john` → `"User john profile"`
- `http://localhost:3000/user/abc` → `"User abc profile"`

### **Test GET / (Static HTML)**
1. Set **URL** to `http://localhost:3000/`
2. Click **Send**

**Expected Response:**
HTML page (the Profile page)

---

## **Testing Method 2: Using cURL (Command Line)**

### **Test GET /api**
```bash
curl http://localhost:3000/api
```

**Output:**
```json
{"message":"My Week 2 API!"}
```

### **Test POST /user (Valid)**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Joseph","email":"joseph@example.com"}'
```

**Output:**
```json
{"message":"Hello, Joseph!"}
```

### **Test POST /user (Error)**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Joseph"}'
```

**Output:**
```json
{"error":"Missing required fields","required":["name","email"]}
```

### **Test GET /user/:id**
```bash
curl http://localhost:3000/user/123
```

**Output:**
```json
{"message":"User 123 profile"}
```

---

## **Testing Method 3: Using Browser**

### **Test GET /api**
1. Open browser
2. Go to `http://localhost:3000/api`
3. Should see: `{"message":"My Week 2 API!"}`

### **Test GET /user/:id**
1. Go to `http://localhost:3000/user/john`
2. Should see: `{"message":"User john profile"}`

### **Test GET /** (Static Page)
1. Go to `http://localhost:3000/`
2. Should see your Profile HTML page

### **Test POST /user**
Can't test POST in browser address bar. Use Postman or cURL.

---

## **Test Output: Check Server Logs**

While testing, watch your terminal where the server is running. You should see logs like:

```
[2025-10-19T23:40:13.176Z] GET /api
[2025-10-19T23:40:14.692Z] POST /user
[2025-10-19T23:40:15.850Z] GET /user/123
[2025-10-19T23:40:16.250Z] GET /
```

This is the custom logging middleware working!

---

## **Testing Checklist**

- [ ] **GET /api** returns `"My Week 2 API!"`
- [ ] **POST /user** with valid data returns `"Hello, [name]!"`
- [ ] **POST /user** without name/email returns HTTP 400 error
- [ ] **GET /user/:id** returns `"User [id] profile"`
- [ ] **GET /user/123** works
- [ ] **GET /user/john** works  
- [ ] **GET /** returns HTML page
- [ ] Server logs show all requests
- [ ] All middleware is working properly

---

## **Troubleshooting Tests**

### **Problem: "Cannot connect to localhost:3000"**
- Check: Is server running? (`npm start` in terminal)
- Check: Is Port 3000 available? Try changing PORT in `.env`

### **Problem: "Missing required fields" when sending valid data**
- Check: Are you using **Raw** and **JSON** in Postman?
- Check: Is the JSON properly formatted? `{"name":"...","email":"..."}`

### **Problem: Server shows "Cannot POST /user"**
- Check: Are you using `POST` method, not `GET`?
- Check: Is `express.json()` middleware included in app.js?

### **Problem: GET /user/:id returns file not found**
- This means VS Code's Live Preview is interfering
- Use Postman instead, or navigate directly in browser to `http://localhost:3000/user/123`

---

## **Sample Test Data**

Use these values to test:

**Valid Users:**
```json
{
  "name": "Joseph",
  "email": "joseph@example.com"
}
```

```json
{
  "name": "Alice",
  "email": "alice@test.com"
}
```

**Invalid Data (Missing Email):**
```json
{
  "name": "Bob"
}
```

**Invalid Data (Missing Name):**
```json
{
  "email": "charlie@test.com"
}
```

**Invalid Data (Empty):**
```json
{}
```

---

## **Response Codes You'll See**

| Code | Meaning | When You See It |
|------|---------|-----------------|
| 200 | OK | Successful GET/POST |
| 201 | Created | Data was created (not used here) |
| 400 | Bad Request | Missing required fields |
| 404 | Not Found | Route doesn't exist |
| 500 | Server Error | Code has a bug |

---

## **Testing Real-World Scenarios**

### **Scenario 1: User Registration**
Pretend `/user` is a registration endpoint.

- **Valid:** `{"name":"John","email":"john@domain.com"}` ✅ Success
- **Invalid:** `{"name":"John"}` ❌ Error (missing email)
- **Invalid:** `{"email":"john@domain.com"}` ❌ Error (missing name)

### **Scenario 2: Getting User Profiles**
Pretend `/user/:id` retrieves user profiles from a database.

- `GET /user/1` → Profile for user ID 1
- `GET /user/john_doe` → Profile for user john_doe
- `GET /user/12345` → Profile for user 12345

In real apps, these IDs would come from a database.

---

## **Making Notes**

As you test, write down:
- ✅ What works
- ❌ What doesn't work
- 🤔 What you don't understand

Then refer to `LEARNING_GUIDE.md` for explanations.

---

**Happy Testing! 🎉**
