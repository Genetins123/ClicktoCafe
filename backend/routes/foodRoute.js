const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getFoodImage
} = require('../controllers/foodController');

// Multer config (for image uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create
router.post('/add', upload.single('image'), addFood);

// Read
router.get('/', getAllFoods);         // Get all foods
router.get('/:id', getFoodById);      // Get single food by ID
router.get('/:id/image', getFoodImage); // Get food image

// Update
router.put('/:id', upload.single('image'), updateFood);

// Delete
router.delete('/:id', deleteFood);

module.exports = router;
