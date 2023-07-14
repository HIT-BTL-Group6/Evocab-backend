const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User, Token } = require('../models');
const tokenTypes = require('../config/tokens');

const login = async (username, password) => {
    const user = await User.findOne({
        username,
    }).select('+password');
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError('Tài khoản hoặc mật khẩu không chính xác!', httpStatus.NOT_FOUND);
    }
    return user;
};

const forgotPassword = async (email) => {
    const user = await User.findOne({
        email,
        isEmailVerified: true,
    });
    if (!user) {
        throw new ApiError('Email chưa được xác thực', httpStatus.NOT_FOUND);
    }

    const min = 100000;
    const max = 999999;
    const emailToken = Math.floor(Math.random() * (max - min + 1)) + min;
    user.emailExpires = Date.now() + 1 * 60 * 1000;
    user.emailToken = emailToken;

    await user.save();
    return user;
};

const resetPassword = async (email, password) => {
    const user = await User.findOne({
        email,
        isEmailVerified: true,
    });
    if (!user) {
        throw new ApiError('Email không đúng', httpStatus.NOT_FOUND);
    }
    user.password = password;
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    return await user.save();
};

module.exports = {
    login,
    forgotPassword,
    resetPassword,
};
