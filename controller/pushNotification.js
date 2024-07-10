const admin = require('firebase-admin');
const { successResponse, failureResponse } = require('../utils/response');
const Stream = require('../models/stream');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { fcmToken, userId, username } = req.body;

            if (!fcmToken || !userId || !username) {
                return failureResponse(res, 400, "FCM token, userId, and username are required");
            }

            // Create new stream document
            const newStream = new Stream({
                userId,
                username,
                fcmToken
            });

            // Save the stream document to the database
            await newStream.save();

            const message = {
                notification: {
                    title: "Zego",
                    body: username + " is Streaming now!\n Click to join!",
                },
                token: fcmToken,
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

            admin.messaging()
                .send(message)
                .then((response) => {
                    successResponse({ token: fcmToken }, res, "Successfully sent message");
                    console.log("Successfully sent message:", response);
                })
                .catch((error) => {
                    failureResponse(res, 400, "Error sending message", { error: error.message });
                    console.log("Error sending message:", error);
                });
        } catch (e) {
            failureResponse(res, 500, "An error occurred", { error: e.message });
            console.error(e);
        }
    }
};
