const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const restaurantCtrl = require("../controllers/restaurant.controller");
const { protect } = require("../middleware/auth");

// Customer
router.get("/", restaurantCtrl.listRestaurants);
router.get("/:id", restaurantCtrl.getRestaurant);

// Admin - create restaurant
router.post("/", protect, upload.single("coverImage"), restaurantCtrl.createRestaurant);
router.post("/:restaurantId/menu", protect, upload.single("image"), restaurantCtrl.addMenuItem);


module.exports = router;
