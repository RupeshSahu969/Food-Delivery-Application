const { Router } = require("express");
const { allowRoles, protect } = require("../middleware/auth");
const { 
  adminAllOrders, 
  createOrder, 
  myOrders, 
  updateStatus 
} = require("../controllers/order.controller");

const router = Router();

// Customer places order
router.post("/", protect, allowRoles("customer"), createOrder);

// Customer sees own orders
router.get("/me", protect, allowRoles("customer"), myOrders);

// Admin can see all orders
router.get("/", protect, allowRoles("admin"), adminAllOrders);

// Admin can update status (delivered, cancelled, etc.)
router.patch("/:id", protect, allowRoles("admin"), updateStatus);

module.exports = router;
