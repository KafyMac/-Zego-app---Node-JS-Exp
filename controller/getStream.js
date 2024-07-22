const { successResponse, failureResponse } = require('../utils/response');
const Stream = require('../models/stream');

module.exports = {
    async getAllActiveStreams(req, res) {
        try {
            const streams = await Stream.find({
                $or: [
                    { endedAt: null },
                    { endedAt: { $exists: false } }
                ]
            });
            successResponse({ streams }, res, "Successfully retrieved active streams");
        } catch (e) {
            failureResponse(res, 500, "An error occurred while retrieving active streams", { error: e.message });
            console.error(e);
        }
    },

    async getAllStreamHistory(req, res) {
        try {
            const streams = await Stream.find({
                endedAt: { $exists: true, $ne: null }
            }).sort({ endedAt: -1 }); // Sort by endedAt in descending order
            successResponse({ streams }, res, "Successfully retrieved stream history");
        } catch (e) {
            failureResponse(res, 500, "An error occurred while retrieving stream history", { error: e.message });
            console.error(e);
        }
    },

    async updateStreamEndTime(req, res) {
        try {
            const { streamId } = req.body;

            if (!streamId) {
                return failureResponse(res, 400, "Stream ID is required");
            }

            const stream = await Stream.findById(streamId);

            if (!stream) {
                return failureResponse(res, 404, "Stream not found");
            }

            stream.endedAt = new Date();
            await stream.save();

            successResponse({ stream }, res, "Successfully updated stream end time");
        } catch (e) {
            failureResponse(res, 500, "An error occurred while updating stream end time", { error: e.message });
            console.error(e);
        }
    }
};
