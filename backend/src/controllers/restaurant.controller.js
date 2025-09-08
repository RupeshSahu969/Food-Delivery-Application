const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { send } = require('../utils/sendResponse');

// ✅ List all restaurants
exports.listRestaurants = async (req, res) => {
  const q = req.query.q || '';
  const data = await Restaurant.find(
    q ? { name: { $regex: q, $options: 'i' } } : {}
  ).sort({ createdAt: -1 });
  return send(res, data);
};

// ✅ Get single restaurant + menu
exports.getRestaurant = async (req, res) => {
  const r = await Restaurant.findById(req.params.id).populate("owner", "name email");
  if (!r) return res.status(404).json({ message: 'Restaurant not found' });
  const items = await MenuItem.find({ restaurant: r._id });
  return send(res, { restaurant: r, items });
};


// Restaurant creates restaurant
// Restaurant creates restaurant
exports.createRestaurant = async (req, res) => {
  try {
    if (req.user.role !== "restaurant") {
      return res.status(403).json({ message: "Only restaurant managers can create restaurants" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Ensure coordinates are parsed correctly
    let coords = null;
    if (req.body.coordinates) {
      if (Array.isArray(req.body.coordinates)) {
        coords = req.body.coordinates.map(Number);
      } else if (req.body["coordinates[0]"] && req.body["coordinates[1]"]) {
        coords = [
          Number(req.body["coordinates[0]"]),
          Number(req.body["coordinates[1]"]),
        ];
      }
    }

    const restaurant = await Restaurant.create({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      cuisines: req.body.cuisines,
      owner: req.user._id, // ✅ take from JWT
      coverImage: imageUrl,
      location: coords ? { type: "Point", coordinates: coords } : undefined, // ✅ only if coords exist
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




// Manager adds menu item
exports.addMenuItem = async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
  if (restaurant.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed to add menu here" });

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const item = await MenuItem.create({
    ...req.body,
    restaurant: restaurantId,
    image: imageUrl
  });

  return send(res, item, "Menu Item Added", 201);
};

