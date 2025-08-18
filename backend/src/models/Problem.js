const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
});

const ProblemSchema = new Schema({
    title: { type: String, required: true, unique: true },
    statement: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    tags: [{ type: String }],
    defaultCode: { type: String, required: true },
    testCases: [TestCaseSchema],
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);

