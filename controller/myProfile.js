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

            // Fetch all FCM tokens except the current user's
            const allUsers = await User.find({ _id: { $ne: user._id } })
                .select('fcmTokens')
                .lean();

            const otherUsersFcmTokens = allUsers
                .flatMap(u => u.fcmTokens || [])
                .filter(token => token); // Remove any null or undefined tokens

            // Create a clean user object
            const cleanUser = {
                _id: user._id,
                name: user.name,
                mobileNumber: user.mobileNumber,
                email: user.email,
                fcmTokens: user.fcmTokens || [],
                followers: user.followers,
                following: user.following
            };

            // Create a clean response object
            const responseData = {
                user: cleanUser,
                otherUsersFcmTokens
            };

            successResponse(responseData, res, "Successfully retrieved user profile and FCM tokens");
        } catch (e) {
            failureResponse(res, 500, "An error occurred while retrieving user profile", { error: e.message });
            console.error(e);
        }
    }
};