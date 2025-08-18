const { Router } = require("express");
const { allowRoles, protect } = require("../middleware/auth");
const { 
  addMenuItem, 
  createRestaurant, 
  getRestaurant, 
  listRestaurants 
} = require("../controllers/restaurant.controller");

const router = Router();

// Public routes
router.get("/", listRestaurants);
router.get("/:id", getRestaurant);

// Only admin can create restaurants
router.post("/", protect, allowRoles("admin"), createRestaurant);

// Only restaurant managers can add menu items to their restaurant
router.post("/:restaurantId/menu", protect, allowRoles("restaurant"), addMenuItem);

module.exports = router;
