const admin = require('firebase-admin');
const { successResponse, failureResponse } = require('../utils/response');
const Stream = require('../models/stream');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { fcmTokens, userId, username, liveID } = req.body;

            if (!Array.isArray(fcmTokens) || fcmTokens.length === 0 || !userId || !username || !liveID) {
                return failureResponse(res, 400, "FCM tokens array, userId, liveID, and username are required");
            }

            // Create new stream document
            const newStream = new Stream({
                liveID,
                userId,
                username,
                fcmTokens
            });

            // Save the stream document to the database
            await newStream.save();

            const message = {
                notification: {
                    title: "Zego",
                    body: `${username} is Streaming now!\n Click to join!`,
                },
                android: {
                    priority: "high",
                },
                apns: {
                    payload: {
                        roomId: "123",
                        task: "stream_started",
                        username,
                        userId,
                        aps: {
                            contentAvailable: true,
                        },
                    },
                },
            };

            const sendPromises = fcmTokens.map(token =>
                admin.messaging().send({ ...message, token })
            );

            Promise.all(sendPromises)
                .then((responses) => {
                    successResponse({ tokens: fcmTokens }, res, "Successfully sent messages");
                    console.log("Successfully sent messages:", responses);
                })
                .catch((error) => {
                    failureResponse(res, 400, "Error sending messages", { error: error.message });
                    console.log("Error sending messages:", error);
                });

        } catch (e) {
            failureResponse(res, 500, "An error occurred", { error: e.message });
            console.error(e);
        }
    }
};