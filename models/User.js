const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    joinDate: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user'], required: true },
    displayName: { type: String, required: true },
    img_url: {type: String, required: false}
    
})

module.exports = mongoose.model('User', userSchema)