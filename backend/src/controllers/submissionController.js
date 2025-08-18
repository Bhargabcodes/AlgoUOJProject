const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const axios = require('axios');

// The URL for your separate compiler service
const COMPILER_SERVICE_URL = process.env.COMPILER_SERVICE_URL || 'http://localhost:4000';

// Helper function to normalize and compare outputs
const compareOutputs = (actual, expected) => {
    const normalize = (str) => str.replace(/\r\n/g, '\n').trim();
    return normalize(actual) === normalize(expected);
};

exports.createSubmission = async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated." });
    }
    const userId = req.user.id;

    // Find the problem in your data to get its test cases
    let problem;
    try {
        problem = await Problem.findOne({ _id: problemId });
    } catch (err) {
        console.error("Error finding problem:", err.message);
        return res.status(500).json({ error: "Failed to retrieve problem data." });
    }
    if (!problem) {
        return res.status(404).json({ error: "Problem not found." });
    }

    let finalStatus = 'Accepted';
    let finalOutput = '';
    
    // Assumes one consolidated test case object per problem
    let allPassed = true;
    let outputs = [];
    for (const testCase of problem.testCases) {
        try {
            const compilerResponse = await axios.post(`${COMPILER_SERVICE_URL}/execute`, {
                language,
                code,
                input: testCase.input,
            });

            const result = compilerResponse.data;

            if (result.error) {
                finalStatus = 'Compilation Error';
                finalOutput = result.error;
                allPassed = false;
                break;
            } else if (!compareOutputs(result.output, testCase.expectedOutput)) {
                finalStatus = 'Wrong Answer';
                finalOutput = `Your code failed on a test case.\n\nInput:\n${testCase.input}\n\nExpected Output:\n${testCase.expectedOutput}\n\nYour Output:\n${result.output}`;
                allPassed = false;
                break;
            } else {
                outputs.push({
                    input: testCase.input,
                    expected: testCase.expectedOutput,
                    output: result.output
                });
            }
        } catch (error) {
            console.error("Error during submission:", error.message);
            finalStatus = 'Runtime Error';
            finalOutput = 'Failed to execute code. Could not connect to compiler service.';
            allPassed = false;
            break;
        }
    }
    if (allPassed) {
        finalStatus = 'Accepted';
        finalOutput = 'All test cases passed!';
    }

    // Save the final result to the database
    const newSubmission = new Submission({
        userId,
        problemId,
        language,
        code,
        status: finalStatus,
        output: finalOutput,
    });
    await newSubmission.save();

    // Send the final result back to the frontend
    res.status(201).json(newSubmission);
};