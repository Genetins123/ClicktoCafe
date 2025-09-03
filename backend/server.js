const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const userRoutes = require('./routes/userRoute');
const foodRoutes = require('./routes/foodRoute');
const restaurantRoutes = require('./routes/restaurantRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/user', userRoutes);          // Example: /api/users/register
app.use('/api/foods', foodRoutes);          // Example: /api/foods/:id
app.use('/api/restaurants', restaurantRoutes); // Example: /api/restaurants/:id/foods

// Health check
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// MongoDB connection + server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Connected to MongoDB & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ DB connection error:', error.message);
  });
