const { Router } = require('express');
const { allowRoles, protect } = require('../middleware/auth');
const { addMenuItem, createRestaurant, getRestaurant, listRestaurants } = require('../controllers/restaurant.controller');

const router = Router();
router.get('/', listRestaurants);
router.get('/:id', getRestaurant);
router.post('/', protect, allowRoles('admin'), createRestaurant);
router.post('/:restaurantId/menu', protect, allowRoles('admin'), addMenuItem);
module.exports = router;
