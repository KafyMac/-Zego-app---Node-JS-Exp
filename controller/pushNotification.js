const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { successResponse, failureResponse } = require('../utils/response');
const dotenv = require('dotenv');
dotenv.config();

try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('utf8')) : null;

if (serviceAccount && !admin.apps.length) {
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
