const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    price: { 
      type: Number, 
      required: true 
    },
    category: { 
      type: String, 
      // required: true 
    },
    image: { 
      type: String 
    },
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isAvailable: { 
      type: Boolean, 
      default: true 
    },
    ingredients: [String],
    spicyLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);