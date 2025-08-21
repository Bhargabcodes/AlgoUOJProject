//backend\src\controllers\submissionController.js
const Submission = require('../models/Submission');
const { problems } = require('../data/problemsData');
const axios = require('axios');

const COMPILER_SERVICE_URL = process.env.COMPILER_SERVICE_URL || 'http://localhost:4000';

const compareOutputs = (actual, expected) => {
    const normalize = (str) => String(str).replace(/\r\n/g, '\n').trim();
    return normalize(actual) === normalize(expected);
};

exports.createSubmission = async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;
    
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated." });
    }
    const userId = req.user.id;

    const problem = problems.find(p => p.id === problemId);
    if (!problem) {
        return res.status(404).json({ error: "Problem not found." });
    }

    let finalStatus = 'Accepted';
    const testCaseResults = []; // FIX: Initialize the correct array name
    let hasFailed = false;

    try {
        // FIX: Use a traditional for loop to get the index 'i'
        for (let i = 0; i < problem.testCases.length; i++) {
            if (hasFailed) break;

            const testCase = problem.testCases[i];
            console.log(`Running test case ${i + 1}...`);

            const compilerResponse = await axios.post(`${COMPILER_SERVICE_URL}/execute`, {
                language,
                code,
                input: testCase.input,
                timeLimit: problem.timeLimit,
            });

            const result = compilerResponse.data;
            let currentCaseStatus = 'Passed';

            if (result.errorType === 'compilation') {
                finalStatus = 'Compilation Error';
                testCaseResults.push({ status: 'Compilation Error', time: 0, output: result.error });
                hasFailed = true;
            } else if (result.errorType === 'timeout') {
                finalStatus = 'Time Limit Exceeded';
                currentCaseStatus = 'Time Limit Exceeded';
                hasFailed = true;
            } else if (result.error) {
                finalStatus = 'Runtime Error';
                currentCaseStatus = 'Runtime Error';
                hasFailed = true;
            } else if (!compareOutputs(result.output, testCase.expectedOutput)) {
                finalStatus = 'Wrong Answer';
                currentCaseStatus = 'Wrong Answer';
                hasFailed = true;
            }
            
            testCaseResults.push({ status: currentCaseStatus, time: result.executionTime });
        }
    } catch (error) {
        console.error("Error during submission:", error.message);
        finalStatus = 'Runtime Error';
        // FIX: Push to the correct array name
        testCaseResults.push({ status: 'System Error', time: 0 });
    }

    const newSubmission = new Submission({
        userId,
        problemId,
        language,
        code,
        status: finalStatus,
        output: JSON.stringify(testCaseResults),
    });
    await newSubmission.save();

    res.status(201).json(newSubmission);
};

exports.getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user.id })
            .populate('problemId', 'title') 
            .sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        console.error("Error fetching user submissions:", error.message);
        res.status(500).send('Server Error');
    }
};
