const User = require('../models/user');
const { successResponse, failureResponse } = require('../utils/response');

module.exports = {
    async getProfile(req, res) {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return failureResponse(res, 404, "User not found");
            }

            successResponse({ user }, res, "Successfully retrieved user profile");
        } catch (e) {
            failureResponse(res, 500, "An error occurred while retrieving user profile", { error: e.message });
            console.error(e);
        }
    }
};
