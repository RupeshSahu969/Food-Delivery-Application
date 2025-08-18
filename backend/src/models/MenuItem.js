const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    title: { type: String, required: true },
    image: String,
    price: { type: Number, required: true },
    isVeg: { type: Boolean, default: true },
    tags: [String],
    desc: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
