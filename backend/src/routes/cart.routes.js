const { Router } = require('express');
const { protect } = require('../middleware/auth');
const { addToCart, clearCart, getCart, removeFromCart } = require('../controllers/cart.controller');

const router = Router();
router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:itemId', protect, removeFromCart);
router.delete('/', protect, clearCart);
module.exports = router;
