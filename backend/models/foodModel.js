const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
