const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    coverImage: { type: String },
    images: [{ type: String }],
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: { type: [Number] }, // [lng, lat]
    },
    cuisines: [{ type: String }],
    deliveryFee: { type: Number, default: 20 },
    rating: { type: Number, default: 4.2 },
    openingHours: {
      open: { type: String, default: "09:00 AM" },
      close: { type: String, default: "11:00 PM" },
    },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

restaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
