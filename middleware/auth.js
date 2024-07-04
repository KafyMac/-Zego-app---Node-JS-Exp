const jwt = require('jsonwebtoken');
const { failureResponse } = require('../utils/response');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    // Get token from header
    let token = req.headers.authorization;

    // Check if no token
    if (!token) {
        return failureResponse(res, 400, "Token is not available");
    }

    // Remove Bearer prefix if it exists
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from environment variables
        req.user = decoded; // Attach the entire decoded object, assuming it contains user details

        // Check if user exists in the database
        const findUser = await User.findById(decoded.userId);
        if (!findUser) {
            return failureResponse(res, 400, "User not authorized");
        }

        req.user = findUser; // Attach the found user object to the request
        next();
    } catch (err) {
        console.log("error", err);
        return failureResponse(res, 400, "Token is not valid");
    }
};
