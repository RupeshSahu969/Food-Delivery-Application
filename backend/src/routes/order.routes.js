const { Router } = require('express');
const { allowRoles, protect } = require('../middleware/auth');
const { adminAllOrders, createOrder, myOrders, updateStatus } = require('../controllers/order.controller');

const router = Router();
router.post('/', protect, createOrder);
router.get('/me', protect, myOrders);
router.get('/', protect, allowRoles('admin'), adminAllOrders);
router.patch('/:id', protect, allowRoles('admin'), updateStatus);
module.exports = router;
