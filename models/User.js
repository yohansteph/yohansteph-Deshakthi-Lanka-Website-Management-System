const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true }); // This adds createdAt and updatedAt automatically

module.exports = mongoose.model('User', UserSchema);
