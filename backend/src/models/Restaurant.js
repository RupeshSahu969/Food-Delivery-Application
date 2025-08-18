const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    coverImage: String,
    address: String,
    rating: { type: Number, default: 4.5 },
    deliveryFee: { type: Number, default: 20 },
    categories: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
