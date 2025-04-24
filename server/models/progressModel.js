const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    lastWatchedTime: { type: Number, required: true },
    watchedIntervals: { type: [[Number]], required: true }
}, { timestamps: true });
  
const Progress = mongoose.model('progress', progressSchema);

module.exports = Progress;
  