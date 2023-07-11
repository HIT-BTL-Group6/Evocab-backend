const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');

const login = async (username, password) => {
    const user = await User.findOne({
        username,
    }).select('+password');
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError('Tài khoản hoặc mật khẩu không chính xác!', httpStatus.NOT_FOUND);
    }
    return user;
};

module.exports = {
    login,
};
