const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    id: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Url', urlSchema);