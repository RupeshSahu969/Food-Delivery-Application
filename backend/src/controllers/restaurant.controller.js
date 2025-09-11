const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { send } = require('../utils/sendResponse');
const { getFileUrl } = require("../utils/getFileUrl");

// Get all restaurants with optional search
exports.listRestaurants = async (req, res) => {
  try {
    const { q, cuisine } = req.query;
    let filter = {};
    
    if (q) {
      filter.name = { $regex: q, $options: 'i' };
    }
    
    if (cuisine) {
      filter.cuisineType = { $regex: cuisine, $options: 'i' };
    }
    
    const restaurants = await Restaurant.find(filter)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    
    return send(res, restaurants);
  } catch (error) {
    return send(res, null, error.message, 500);
  }
};

// Get single restaurant with menu
exports.getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findById(id).populate('owner', 'name email');
    if (!restaurant) {
      return send(res, null, "Restaurant not found", 404);
    }
    
    const menuItems = await MenuItem.find({ restaurant: id, isAvailable: true });
    
    return send(res, { restaurant, menu: menuItems });
  } catch (error) {
    return send(res, null, error.message, 500);
  }
};

// Create a new restaurant
exports.createRestaurant = async (req, res, next) => {
  try {
    const { name, address, cuisineType, openingHours, deliveryTime } = req.body;

    const imageUrl = req.file ? getFileUrl(req, req.file.filename) : null;

    const restaurant = new Restaurant({
      name,
      address,
      cuisineType,
      openingHours,
      deliveryTime,
      image: imageUrl,
      owner: req.user._id,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
};

exports.addMenuItem = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // ✅ build image URL
    const imageUrl = req.file ? getFileUrl(req, req.file.filename) : null;

    const menuItem = new MenuItem({
      name,
      description,
      price,
      image: imageUrl,
      restaurant: restaurantId,
    });

    await menuItem.save();

    res.status(201).json({
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    next(error);
  }
};



// Get restaurant menu
exports.getRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { category } = req.query;
    
    let filter = { restaurant: restaurantId, isAvailable: true };
    
    if (category && category !== 'all') {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    const menuItems = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    
    return send(res, menuItems);
  } catch (error) {
    return send(res, null, error.message, 500);
  }
};