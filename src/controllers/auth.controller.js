const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services/index');

const register = catchAsync(async (req, res, next) => {
    const userBpdy = req.body;

    const user = await userService.createUser(userBpdy);
    res.status(httpStatus.CREATED).json({
        status: 'Đăng ký thành công!',
        user,
    });
});

const login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await authService.login(username, password);
    const tokens = await tokenService.createAuthTokens(user);
    return res.status(httpStatus.OK).json({
        status: 'Đăng nhập thành công!',
        tokens,
    });
});

const forgotPassword = catchAsync(async (req, res, next) => {});

const resetPassword = catchAsync(async (req, res, next) => {});
module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
};
