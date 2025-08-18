const { Router } = require("express");
const { protect, allowRoles } = require("../middleware/auth");
const { 
  addToCart, 
  clearCart, 
  getCart, 
  removeFromCart 
} = require("../controllers/cart.controller");

const router = Router();

// Cart is only for customers
router.get("/", protect, allowRoles("customer"), getCart);
router.post("/", protect, allowRoles("customer"), addToCart);
router.delete("/:itemId", protect, allowRoles("customer"), removeFromCart);
router.delete("/", protect, allowRoles("customer"), clearCart);

module.exports = router;
