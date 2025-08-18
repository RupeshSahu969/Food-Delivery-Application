const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        qty: { type: Number, default: 1 },
        price: Number
      }
    ],
    subtotal: Number,
    deliveryFee: Number,
    total: Number,
    status: { type: String, enum: ['placed', 'preparing', 'on-the-way', 'delivered', 'cancelled'], default: 'placed' },
    address: String,
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
