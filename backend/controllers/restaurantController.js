const Restaurant = require("../models/restaurantModel");

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get foods by restaurant (with restaurant details)
const getFoodsByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id).populate("foods");
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Create restaurant (✅ Prevent duplicates)
const createRestaurant = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if restaurant already exists
    const existing = await Restaurant.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Restaurant already exists!" });
    }

    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();

    res.status(201).json({ message: "Restaurant added successfully!", data: newRestaurant });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Restaurant.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update restaurant
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getRestaurants,
  getFoodsByRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
