const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the user schema
const StreamSchema = Schema({
    liveID: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    fcmTokens: {
        type: [String],
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null }
}, { versionKey: false });

// Create and export the User model
module.exports = mongoose.model('Stream', StreamSchema);
