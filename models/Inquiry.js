const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: { 
        type: String, 
        default: 'Pending' 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

// Ensure the variable name here matches 'inquirySchema' above
module.exports = mongoose.model('Inquiry', inquirySchema);