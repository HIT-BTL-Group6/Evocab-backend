const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService, emailService } = require('../services/index');

const register = catchAsync(async (req, res, next) => {
    const userBody = req.body;

    const user = await userService.createUser(userBody);
    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Register successfully!',
        data: user,
    });
});

const login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await authService.login(username, password);
    const tokens = await tokenService.createAuthTokens(user);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Login successfully!',
        data: tokens,
    });
});

const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await authService.forgotPassword(email);
    await emailService.sendResetPasswordEmail(email, user.username, user.emailToken, 'Đặt lại mật khẩu');

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Created emailToken successfully!',
        data: user.emailToken,
    });
});

const resetPassword = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    await authService.resetPassword(email, password);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Reset password successfully!',
        data: [],
    });
});

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
};
