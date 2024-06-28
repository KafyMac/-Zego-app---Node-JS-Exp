const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, failureResponse } = require('../utils/response');

module.exports = {
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Check if required parameters are provided
            if (!email || !password) {
                return failureResponse(res, "Email and password are required", 400);
            }

            // Check if user with the given email exists
            const user = await User.findOne({ email });
            if (!user) {
                return failureResponse(res, "Invalid email or password", 401);
            }

            // Check if the provided password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return failureResponse(res, "Invalid email or password", 401);
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            // Return success response with token
            const responseData = {
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber
                }
            };

            return successResponse(res, "Login successful", responseData);
        } catch (err) {
            return failureResponse(res, "Error logging in", 400, {});
        }
    }
};
