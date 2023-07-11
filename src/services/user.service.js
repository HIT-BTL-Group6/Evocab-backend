const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng này!');
    return user;
};

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email này đã được đăng ký!');
    } else if (await User.isUsernameTaken(userBody.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username đã được đăng ký!');
    }
    const user = await User.create(userBody);
    return user;
};

const updateUserById = async (userId, updateBody) => {
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email này đã được đăng ký');
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateBody, { new: true });
    if (!updatedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng!');
    }
    return updatedUser;
};

const deleteUserById = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng!');
    }
    return deletedUser;
};

module.exports = {
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
