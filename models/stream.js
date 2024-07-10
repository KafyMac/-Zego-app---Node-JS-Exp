const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the user schema
const StreamSchema = Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    fcmToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null }
}, { versionKey: false });

// Create and export the User model
module.exports = mongoose.model('Stream', StreamSchema);
