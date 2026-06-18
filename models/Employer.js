const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    contactName: String,
    email: String,
    companyName: String,
    targetRegion: String,
    comment: String,
    status: { 
        type: String, 
        default: 'Pending' 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Employer', employerSchema);