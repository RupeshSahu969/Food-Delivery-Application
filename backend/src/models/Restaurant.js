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
      required: true 
    },
    description: { 
      type: String 
    },
    cuisineType: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    contact: {
      phone: String,
      email: String
    },
    openingHours: {
      type: String,
      default: "9:00 AM - 10:00 PM"
    },
    image: { 
      type: String 
    },
    rating: { 
      type: Number, 
      default: 4.0 
    },
    deliveryTime: {
      type: String,
      default: "30-40 min"
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

// Create geospatial index for location-based queries
restaurantSchema.index({ "address.location": "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);