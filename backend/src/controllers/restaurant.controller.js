const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { send } = require('../utils/sendResponse');

exports.listRestaurants = async (req, res) => {
  const q = req.query.q || '';
  const data = await Restaurant.find(q ? { name: { $regex: q, $options: 'i' } } : {}).sort({ createdAt: -1 });
  console.log(data,"data");
  return send(res, data);
};

exports.getRestaurant = async (req, res) => {
  const r = await Restaurant.findById(req.params.id);
  if (!r) return res.status(404).json({ message: 'Restaurant not found' });
  const items = await MenuItem.find({ restaurant: r._id });
  return send(res, { restaurant: r, items });
};

exports.createRestaurant = async (req, res) => {
  const r = await Restaurant.create(req.body);
  return send(res, r, 'Created', 201);
};

exports.addMenuItem = async (req, res) => {
  const { restaurantId } = req.params;
  const item = await MenuItem.create({ ...req.body, restaurant: restaurantId });
  return send(res, item, 'Added', 201);
};
