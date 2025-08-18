//backend\src\models\Submission.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    problemId: { 
        type: String 
    },
    language: { 
        type: String, 
        required: true 
    },
    code: { 
        type: String, 
        required: true 
    },
    output: { 
        type: String 
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);