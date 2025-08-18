const { Router } = require('express');
const { login, me, register } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
module.exports = router;
