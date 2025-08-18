const express = require('express');
const router = express.Router();

// 1. Import getCurrentUser and the middleware
const { register, login, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// 2. Add the new protected route for getting the current user
// @route   GET api/auth/me
// @desc    Get current logged in user's data
// @access  Private
router.get('/me', authMiddleware, getCurrentUser);


module.exports = router;
