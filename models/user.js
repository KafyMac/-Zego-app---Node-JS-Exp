// Example models/user.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the user schema
const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }]

}, { versionKey: false });

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
