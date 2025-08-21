const express = require('express');
const router = express.Router();
const { getAllProblems, createProblem } = require('../controllers/problemController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/problemsgetAll
router.get('/getAll', getAllProblems);

// @route   POST /api/problems
router.post('/', authMiddleware, createProblem);

module.exports = router;