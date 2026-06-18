const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    email: String,
    destination: String,
    details: String,
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);