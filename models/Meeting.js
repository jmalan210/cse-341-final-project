const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    location: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})