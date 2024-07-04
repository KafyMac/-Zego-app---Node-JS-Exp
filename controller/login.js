const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { failureResponse } = require('../utils/response');

module.exports = {
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Check if required parameters are provided
            if (!email || !password) {
                return failureResponse(res, 400, "Email and password are required");
            }

            // Check if user with the given email exists
            const user = await User.findOne({ email });
            if (!user) {
                return failureResponse(res, 401, "Invalid email or password");
            }

            // Check if the provided password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return failureResponse(res, 401, "Incorrect password");
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            // Return success response with token and user details
            const responseData = {
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber
                }
            };

            return res.json({
                status: "Success",
                message: "Login successful",
                data: responseData
            });
        } catch (err) {
            console.error(err);
            return failureResponse(res, 500, "Failed to login", err.message);
        }
    }
};
