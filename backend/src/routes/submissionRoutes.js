//submissionRoutes.js
const express = require('express');
const router = express.Router();
const { createSubmission } = require('../controllers/submissionController');
const authMiddleware = require('../middlewares/authMiddleware');



// @route   POST /api/submissions
// @desc    Create a new code submission
// @access  Private
router.post('/answer', authMiddleware, createSubmission);

module.exports = router;