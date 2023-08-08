const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        const data = [];
        error = new ApiError(statusCode, message, false, data);
    }
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message, data } = err;

    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
        data = [];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        data,
    };

    if (config.env === 'development') {
        delete response.stack;
        logger.error(err);
    }

    res.status(statusCode).json(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};
