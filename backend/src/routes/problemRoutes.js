const express = require('express');
const router = express.Router();
const { getAllProblems, createProblem } = require('../controllers/problemController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/problemsgetAll
router.get('/getAll', getAllProblems);

// @route   POST /api/problems/qns
router.post('/qn', authMiddleware, createProblem);

module.exports = router;