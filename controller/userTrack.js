const mongoose = require('mongoose');
const User = require('../models/user'); // Import your User model
const { successResponse, failureResponse } = require('../utils/response'); // Import your response helpers

module.exports = {
    async followUser(req, res) {
        const userIdToFollow = req.body.userIdToFollow;
        const currentUserId = req.user._id; // Assuming the user ID is available in the req.user object

        try {
            const currentUser = await User.findById(currentUserId);
            const userToFollow = await User.findById(userIdToFollow);

            if (!currentUser) {
                return failureResponse(res, 400, "No User found");
            }

            if (!userToFollow) {
                return failureResponse(res, 401, "Failed to follow this user");
            }

            if (currentUser.following.includes(userIdToFollow)) {
                return failureResponse(res, 402, 'Already following this user');
            }

            // Update following for current user and followers for userToFollow
            currentUser.following.push(userIdToFollow);
            await currentUser.save();

            userToFollow.followers.push(currentUserId);
            await userToFollow.save();

            // Populate the following and followers fields
            const populatedCurrentUser = await User.findById(currentUserId)
                .populate('following', '_id name mobileNumber email')
                .populate('followers', '_id name mobileNumber email');

            const populatedUserToFollow = await User.findById(userIdToFollow)
                .populate('following', '_id name mobileNumber email')
                .populate('followers', '_id name mobileNumber email');

            return successResponse({
                currentUser: populatedCurrentUser,
                userToFollow: populatedUserToFollow
            }, res, 'Successfully followed user');
        } catch (err) {
            console.error(err);
            return failureResponse(res, 400, "Error following user", {});
        }
    },

    async unfollowUser(req, res) {
        const userIdToUnfollow = req.body.userIdToUnfollow;
        const currentUserId = req.user._id; // Assuming the user ID is available in the req.user object

        try {
            const currentUser = await User.findById(currentUserId);
            const userToUnfollow = await User.findById(userIdToUnfollow);

            if (!currentUser) {
                return failureResponse(res, 400, "No User found");
            }

            console.log(currentUser, "currentUser")
            console.log(userToUnfollow, "userToUnfollow")
            if (!userToUnfollow) {
                return failureResponse(res, 401, "Failed to unfollow this user");
            }

            if (!currentUser.following.includes(userIdToUnfollow)) {
                return failureResponse(res, 402, 'User is not currently followed');
            }

            // Remove userIdToUnfollow from following array of currentUser
            currentUser.following.pull(userIdToUnfollow);
            await currentUser.save();

            // Remove currentUserId from followers array of userToUnfollow
            userToUnfollow.followers.pull(currentUserId);
            await userToUnfollow.save();

            // Populate the following and followers fields
            const populatedCurrentUser = await User.findById(currentUserId)
                .populate('following', '_id name mobileNumber email')
                .populate('followers', '_id name mobileNumber email');

            const populatedUserToUnfollow = await User.findById(userIdToUnfollow)
                .populate('following', '_id name mobileNumber email')
                .populate('followers', '_id name mobileNumber email');

            return successResponse({
                currentUser: populatedCurrentUser,
                userToUnfollow: populatedUserToUnfollow
            }, res, 'Successfully unfollowed user');
        } catch (err) {
            console.error(err);
            return failureResponse(res, 400, "Error unfollowing user", {});
        }
    },

    async getFollowedUsers(req, res) {
        const currentUserId = req.user._id; // Assuming the user ID is available in the req.user object

        try {
            const currentUser = await User.findById(currentUserId).populate('following', '_id name mobileNumber email');

            if (!currentUser) {
                return failureResponse(res, 400, "No User found");
            }

            return successResponse(currentUser.following, res, "Successfully fetched followed users");
        } catch (err) {
            console.error(err);
            return failureResponse(res, 400, "Error fetching followed users", {});
        }
    },

    async getUnfollowedUsers(req, res) {
        const currentUserId = req.user._id; // Assuming the user ID is available in the req.user object

        try {
            const users = await User.find({ _id: { $ne: currentUserId }, followers: { $nin: [currentUserId] } });

            if (!users) {
                return failureResponse(res, 400, "No User found");
            }

            return successResponse(users, res, "Successfully fetched unfollowed users");
        } catch (err) {
            console.error(err);
            return failureResponse(res, 400, "Error fetching unfollowed users", {});
        }
    }
};
