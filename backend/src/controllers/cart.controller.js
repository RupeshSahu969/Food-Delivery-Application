// In-memory cart just for demo. In production place in DB/Redis.
const { send } = require('../utils/sendResponse');
const memory = new Map(); // userId -> { items: [] }

exports.getCart = async (req, res) => {
  const c = memory.get(req.user._id.toString()) || { items: [] };
  return send(res, c);
};

exports.addToCart = async (req, res) => {
  const key = req.user._id.toString();
  const c = memory.get(key) || { items: [] };
  const { menuItem, price, qty = 1, title, image } = req.body;
  const idx = c.items.findIndex(i => i.menuItem === menuItem);
  if (idx >= 0) c.items[idx].qty += qty; else c.items.push({ menuItem, price, qty, title, image });
  memory.set(key, c);
  return send(res, c, 'Added');
};

exports.removeFromCart = async (req, res) => {
  const key = req.user._id.toString();
  const c = memory.get(key) || { items: [] };
  c.items = c.items.filter(i => i.menuItem !== req.params.itemId);
  memory.set(key, c);
  return send(res, c, 'Removed');
};

exports.clearCart = async (req, res) => {
  memory.set(req.user._id.toString(), { items: [] });
  return send(res, { items: [] }, 'Cleared');
};
