const Restaurant = require("../models/restaurantModel");
const Food = require("../models/foodModel");

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get foods by restaurant
const getFoodsByRestaurant = async (req, res) => {
  try {
    const foods = await Food.find({ restaurantId: req.params.id });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add restaurant
const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Delete restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update restaurant
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // return updated document
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  getRestaurants,
  getFoodsByRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
