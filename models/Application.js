const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobId: String,
    jobTitle: String,
    applicantName: String,
    email: String,
    phone: String,
    message: String,
    cvUrl: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);