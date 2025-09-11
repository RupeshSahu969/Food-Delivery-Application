const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const restaurantCtrl = require("../controllers/restaurant.controller");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/", restaurantCtrl.listRestaurants);
router.get("/:id", restaurantCtrl.getRestaurant);
router.get("/:restaurantId/menu", restaurantCtrl.getRestaurantMenu);

// Protected routes (restaurant owners)
router.post("/", protect, upload.single("image"), restaurantCtrl.createRestaurant);
router.post("/:restaurantId/menu", protect, upload.single("image"), restaurantCtrl.addMenuItem);

module.exports = router;