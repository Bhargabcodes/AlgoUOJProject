//submissionRoutes.js
const express = require('express');
const router = express.Router();
const { createSubmission, getUserSubmissions } = require('../controllers/submissionController');
const authMiddleware = require('../middlewares/authMiddleware');



// @route   POST /api/submissions
// @desc    Create a new code submission
// @access  Private
router.post('/', authMiddleware, createSubmission);
// GET /api/submissions/
// Gets all submissions for the current user
router.get('/', authMiddleware, getUserSubmissions);

module.exports = router;