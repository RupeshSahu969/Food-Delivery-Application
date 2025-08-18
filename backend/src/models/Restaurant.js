const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String, // store image URL or path
    },
    address: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    deliveryFee: {
      type: Number,
      default: 20,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
