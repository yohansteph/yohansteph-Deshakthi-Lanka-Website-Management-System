const mongoose = require('mongoose');

const testAttemptSchema = new mongoose.Schema({
    email: { type: String, required: true },
    category: { type: String, required: true },
    score: Number,
    totalQuestions: Number,
    percentage: Number,
    passed: Boolean,
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestAttempt', testAttemptSchema);