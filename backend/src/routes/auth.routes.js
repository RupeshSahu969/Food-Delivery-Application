const { Router } = require('express');
const { login, me, register } = require('../controllers/auth.controller');
const { protect ,isAdmin} = require('../middleware/auth');

const router = Router();
router.post('/register', protect, isAdmin, register);
router.post('/login', login);
router.get('/userdetails', protect, me);
module.exports = router;
