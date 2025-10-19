require(
  'dotenv'
).config();

const express = require('express');
const app = express()
const port = 3000;

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  // Logs every request
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next(); // Pass to next handler or route
});

/**
app.use((req, res, next) => {
  // Simple authentication middleware
  console.log("hello there")
  next(); // Pass to next handler or route
});

app.post('/echo', (req, res) => {
  res.json({ echoed: req.body });
});

*/

/**
app.get('/user:id', (req, res) => {
  const userId = req.params.id;
  console.log(id);
  res.send(id);
});
*/
app.get('/ search', (req, res) => {
  const id = req.query.id;
  console.log(id);
  res.send(id);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
