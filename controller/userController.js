const User = require("../models/user");
const bcrypt = require("bcrypt");
const { successResponse, failureResponse } = require("../utils/response");

module.exports = {
    async createUser(req, res) {
        try {
            const { name, email, mobileNumber, password } = req.body;

            // Check if required parameters are provided
            if (!name || !email || !password || !mobileNumber) {
                return failureResponse(res, "Name, email, mobile Number, and password are required", 400);
            }

            // Check if user with the same email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return failureResponse(res, 'User already exists. Please sign in', 400);
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user instance
            const newUser = new User({
                name,
                email,
                mobileNumber,
                password: hashedPassword
            });

            // Save the user to the database
            await newUser.save();

            // Return the new user object excluding sensitive fields
            const responseData = {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    mobileNumber: newUser.mobileNumber
                }

            };

            // Return success response
            return successResponse(res, 'User created successfully', responseData);
        } catch (err) {
            return failureResponse(res, 'Error Creating User', 400, {});
        }
    }
};
