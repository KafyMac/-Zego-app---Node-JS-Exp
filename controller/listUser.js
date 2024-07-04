const User = require('../models/user');
const { successResponse, failureResponse } = require('../utils/response');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
                .populate('following', '_id name mobileNumber email')
                .populate('followers', '_id name mobileNumber email');

            if (users.length > 0) {
                return successResponse(users, res, "Fetched all users.");
            } else {
                return successResponse([], res, "No users found.");
            }
        } catch (err) {
            console.error(err);
            return failureResponse(res, 500, "Failed to fetch users", err.message);
        }
    }
};
