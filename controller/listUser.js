const User = require('../models/user');
const { successResponse, failureResponse } = require('../utils/response');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const currentUserId = req.user._id; // Assuming req.user contains the current user's information
            const users = await User.find({ _id: { $ne: currentUserId } })
                .populate('following', '_id name mobileNumber email')
                .populate('followers', '_id name mobileNumber email');

            const responseData = {
                users,
                total: users.length
            };

            if (users.length > 0) {
                return successResponse(responseData, res, "Fetched all users.");
            } else {
                return successResponse(responseData, res, "No users found.");
            }
        } catch (err) {
            console.error(err);
            return failureResponse(res, 500, "Failed to fetch users", err.message);
        }
    }
};
