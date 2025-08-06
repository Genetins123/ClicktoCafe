const Food = require('../models/foodModel');

// CREATE
const addFood = async (req, res) => {
  try {
    const { name, price, category, store } = req.body;

    const newFood = new Food({
      name,
      price,
      category,
      store,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });

    await newFood.save();
    res.status(201).json({ message: 'Food added successfully', food: newFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add food' });
  }
};

// READ ALL
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

// READ ONE
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch food' });
  }
};

// UPDATE
const updateFood = async (req, res) => {
  try {
    const { name, price, category, store } = req.body;

    const updateData = {
      name,
      price,
      category,
      store,
    };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedFood = await Food.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedFood) return res.status(404).json({ error: 'Food not found' });

    res.status(200).json({ message: 'Food updated', food: updatedFood });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update food' });
  }
};

// DELETE
const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete food' });
  }
};

module.exports = {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
