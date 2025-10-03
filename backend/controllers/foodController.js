const Food = require("../models/foodModel");
const Restaurant = require("../models/restaurantModel");

// ✅ Get all foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("restaurant", "name");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get food by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("restaurant", "name");
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get foods by Restaurant
const getFoodsByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const foods = await Food.find({ restaurant: id }).populate("restaurant");

    res.json({
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
        image_url: restaurant.image_url,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        delivery_time: restaurant.delivery_time,
        offer: restaurant.offer,
        delivery_type: restaurant.delivery_type,
      },
       totalFoods: foods.length,
      foods,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Add food
const addFood = async (req, res) => {
  try {
    const { name, price, category, description, rating, offer, image_url, restaurant, foodType } = req.body;

    const restaurantExists = await Restaurant.findById(restaurant);
    if (!restaurantExists) return res.status(400).json({ message: "Invalid restaurant ID" });

    if (!["veg", "non-veg"].includes(foodType)) {
      return res.status(400).json({ message: "foodType must be 'veg' or 'non-veg'" });
    }

    const newFood = new Food({
      name,
      price: Number(price),
      category,
      description: description || "",
      rating: Number(rating) || 0,
      offer: Number(offer) || 0,
      image_url: image_url || "",
      restaurant,
      foodType, // ✅ save
    });

    await newFood.save();

    res.status(201).json({ message: "Food added successfully!", data: newFood });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// ✅ Update food
const updateFood = async (req, res) => {
  try {
    const { name, price, category, description, rating, offer, image_url, restaurant } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(price !== undefined && { price: Number(price) }),
      ...(category && { category }),
      ...(description && { description }),
      ...(rating !== undefined && { rating: Number(rating) }),
      ...(offer !== undefined && { offer: Number(offer) }),
      ...(image_url && { image_url }),
      ...(restaurant && { restaurant }),
    };

    const updated = await Food.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Food not found" });

    res.json({ message: "Food updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete food
const deleteFood = async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getFoods,
  getFoodById,
  getFoodsByRestaurant,
  addFood,
  updateFood,
  deleteFood,
};
