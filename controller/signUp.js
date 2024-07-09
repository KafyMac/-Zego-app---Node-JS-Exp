const User = require("../models/user");
const bcrypt = require("bcrypt");
const { successResponse, failureResponse } = require("../utils/response");

module.exports = {
    async createUser(req, res) {
        try {
            const { name, email, mobileNumber, password, fcmToken } = req.body;

            // Check if required parameters are provided
            if (!name || !email || !password || !mobileNumber || !fcmToken) {
                return failureResponse(res, 400, "Name, email, mobile Number, password, and fcmtoken are required");
            }

            // Check if user with the same email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return failureResponse(res, 400, 'User already exists. Please sign in');
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user instance
            const newUser = new User({
                name,
                email,
                mobileNumber,
                password: hashedPassword,
                fcmToken
            });

            // Save the user to the database
            const savedUser = await newUser.save();

            // Return the new user object excluding sensitive fields
            const responseData = {
                user: {
                    name: savedUser.name,
                    email: savedUser.email,
                    mobileNumber: savedUser.mobileNumber,
                    fcmToken: savedUser.fcmToken
                }
            };

            return successResponse(responseData.user, res, "User created successfully");
        } catch (err) {
            console.error(err);
            return failureResponse(res, 500, "Failed to create user", err.message);
        }
    }
};
