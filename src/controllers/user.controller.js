const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const { userService } = require('../services');

const getUsers = catchAsync(async (req, res, next) => {
    const { sortBy, limit = 10, page = 1, ...conditions } = req.query;
    const skip = (page - 1) * limit;

    const users = await userService.getUsers(limit, skip, conditions);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get users successfully!',
        data: users,
    });
});

const getUser = catchAsync(async (req, res, next) => {
    const userId = req.params.userId || req.user.id;
    const user = await userService.getUserById(userId);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get user by id successfully!',
        data: user,
    });
});

const createUser = catchAsync(async (req, res, next) => {
    const avatarPath = null;

    if (req.file) { 
        const { path } = req.file;
        avatarPath = path.replace(/\\/g, '/');
    }

    const userData = {
        ...req.body,
        avatar: avatarPath,
    };

    const user = await userService.createUser(userData);
    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create user successfully!',
        data: user,
    });
});


const updateUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const updateBody = req.body;
    const user = await userService.updateUserById(userId, updateBody);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update user successfully!',
        data: user,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await userService.deleteUserById(userId);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete user successfully!',
        data: user,
    });
});

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
