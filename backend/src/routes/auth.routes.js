const { Router } = require('express');
const { login, me, register } = require('../controllers/auth.controller');
const { protect, isAdmin, isRestaurantManager } = require('../middleware/auth');

const router = Router();

// Public route (anyone can access this to login or register)
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/userdetails', protect, me);

// Admin-only route
router.post('/admin/register', protect, isAdmin, register); // Only Admin can create new users

module.exports = router;
