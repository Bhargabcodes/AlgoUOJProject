const express = require('express');
const router = express.Router();
const { getAllProblems, createProblem } = require('../controllers/problemController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/problems/getAll
// @desc    Get a list of all problems
// @access  Public
router.get('/getAll', getAllProblems);

// @route   POST /api/problems/create
// @desc    Create a new problem
// @access  Private (should be admin-only in a real app)
router.post('/create', authMiddleware, createProblem);

module.exports = router;
