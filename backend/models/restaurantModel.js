const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true,  unique: true  },
  image_url: String,
  cuisine: String,
  rating: Number,
  delivery_time: String,
  offer: String,
  delivery_type: String,
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
