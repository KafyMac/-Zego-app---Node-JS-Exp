const successResponse = (data, res, message) => {
    return res.status(200).json({
        status: "Success",
        message: message,
        data: data
    });
};
const failureResponse = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json({
        status: "Failed",
        message: message,
        data: data
    });
};


module.exports = { successResponse, failureResponse };
