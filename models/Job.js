const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    salary: String,
    category: String,
    description: String,
    isUrgent: { type: Boolean, default: false },
    imageUrl: String,
    postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);