const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const userRoutes = require('./routes/userRoute');   // User signup/login routes
const foodRoutes = require('./routes/foodRoute');   // Food routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/home/user', userRoutes);  // ✅ signup + login routes
app.use('/api/food', foodRoutes);       // ✅ food routes

// Default route (optional)
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ DB connection error:', error.message);
  });
