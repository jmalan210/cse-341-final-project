const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    body: { type: String, required: true }
})

module.exports = mongoose.model('Message', messageSchema)