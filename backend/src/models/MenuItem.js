const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Menu item title is required"],
      trim: true,
    },
    image: {
      type: String, // image URL
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 1,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    desc: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
