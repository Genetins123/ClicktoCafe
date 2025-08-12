const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const userRoutes = require('./routes/userRoute');     // Adjust if needed
const foodRoutes = require('./routes/foodRoute');     // ✅ Food route

const app = express();
 
// Middleware
app.use(cors()); 
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
 
app.use('/api/home/user', userRoutes);
app.use('/api/food', foodRoutes);                

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    app.listen(process.env.PORT, () => {
      console.log('✅ Connected to DB & listening on port', process.env.PORT);
    }); 
  })
  
  .catch((error) => {
    console.error('❌ DB connection error:', error);
  });
