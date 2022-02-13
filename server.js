const express = require('express');
const app = express();
const connectDB = require('./config/mongoDB');

// Connect to DB
connectDB();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function (req, res) {
  console.log(`Server is running on port ${PORT}`);
});
