const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  rating: { type: Number, default: 0 },
  offer: { type: Number, default: 0 },
  image_url: { type: String, default: "" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },

  // ✅ New field
  foodType: {
    type: String,
    enum: ["veg", "non-veg"], // only these 2 allowed
    required: true
  },
}, { timestamps: true });

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
