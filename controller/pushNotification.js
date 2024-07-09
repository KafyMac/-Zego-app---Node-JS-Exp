const admin = require('firebase-admin');
const { successResponse, failureResponse } = require('../utils/response');
const serviceAccount = require("/Users/kafeel/Desktop/zego-express-js/-Zego-app---Node-JS-Exp/zego-e33a6-firebase-adminsdk-zj7m0-22c951d7d4.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "zego-e33a6",
    });
}

module.exports = {
    async sendMessage(req, res) {
        try {
            const receivedToken = req.body.fcmToken;

            if (!receivedToken) {
                return failureResponse(res, 400, "FCM token is required");
            }

            const message = {
                notification: {
                    title: "Notification from Zego",
                    body: "This is a Test Notification",
                },
                token: receivedToken,
                android: {
                    priority: "high",
                },
                apns: {
                    payload: {
                        aps: {
                            contentAvailable: true,
                        },
                    },
                },
            };

            admin.messaging()
                .send(message)
                .then((response) => {
                    successResponse({ token: receivedToken }, res, "Successfully sent message");
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
