const express = require('express');
const xss = require('xss-clean');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const dotenv = require('dotenv');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');
dotenv.config();

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
module.exports = app;
