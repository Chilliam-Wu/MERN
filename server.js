const express = require('express');
const app = express();
const connectDB = require('./config/mongoDB');

// Connect to DB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Init Middleware
// bosyParser now is inclueded in express
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
