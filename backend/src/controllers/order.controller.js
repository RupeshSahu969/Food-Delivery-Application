const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { send } = require('../utils/sendResponse');

exports.createOrder = async (req, res) => {
  const { restaurant, items, address } = req.body;
  const r = await Restaurant.findById(restaurant);
  if (!r) return res.status(404).json({ message: 'Restaurant not found' });
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = r.deliveryFee || 20;
  const total = subtotal + deliveryFee;
  const order = await Order.create({ user: req.user._id, restaurant, items, subtotal, deliveryFee, total, address });
  return send(res, order, 'Order placed', 201);
};

exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('restaurant');
  return send(res, orders);
};

exports.adminAllOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user restaurant');
  return send(res, orders);
};

exports.updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  return send(res, order, 'Updated');
};
