const Problem = require('../models/Problem');

// --- Get all problems (UPDATED) ---
exports.getAllProblems = async (req, res) => {
    try {
        // Find all problems and send the full objects.
        // We remove .select('title difficulty tags') to get all fields.
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        console.error("Error fetching problems:", error.message);
        res.status(500).send('Server Error');
    }
};

// --- Create a new problem ---
exports.createProblem = async (req, res) => {
    // In a real app, you would add an admin-only middleware here
    try {
        const newProblem = new Problem(req.body);
        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (error) {
        console.error("Error creating problem:", error.message);
        // Handle duplicate title error
        if (error.code === 11000) {
            return res.status(400).json({ error: 'A problem with this title already exists.' });
        }
        res.status(500).send('Server Error');
    }
};

