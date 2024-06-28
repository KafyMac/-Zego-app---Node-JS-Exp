const successResponse = (res, message, data) => {
    return res.status(200).json({
        success: "Success",
        message: message,
        data: data
    });
};

const failureResponse = (res, message, errorCode = 400, data = {}) => {
    return res.status(errorCode).json({
        success: "Failed",
        message: message,
        data: data
    });
};

module.exports = { successResponse, failureResponse };
