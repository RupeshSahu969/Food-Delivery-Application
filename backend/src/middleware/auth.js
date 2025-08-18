const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Protect routes (JWT authentication)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object without password
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Role-based access (can accept multiple roles)
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

// Admin-only route
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can perform this action" });
  }
  next();
};

// Restaurant manager (only can access their own restaurant)
const isRestaurantManager = (req, res, next) => {
  if (!req.user || req.user.role !== "restaurant") {
    return res.status(403).json({ message: "Only restaurant managers can access this" });
  }
  next();
};

module.exports = { protect, allowRoles, isAdmin, isRestaurantManager };
