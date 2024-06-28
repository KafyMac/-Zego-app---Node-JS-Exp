const User = require('../models/user');
const { successResponse, failureResponse } = require('../utils/response');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return successResponse(res, 'Successfully fetched all users', users);
        } catch (err) {
            return failureResponse(res, 'Error fetching users', 500, err.message);
        }
    }
};
