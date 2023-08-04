const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService, emailService } = require('../services/index');

const register = catchAsync(async (req, res, next) => {
    const userBody = req.body;

    const user = await userService.createUser(userBody);
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

const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await authService.forgotPassword(email);
    await emailService.sendResetPasswordEmail(email, user.username, user.emailToken, 'Đặt lại mật khẩu');
    return res.json({
        emailToken: user.emailToken,
    });
});

const resetPassword = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    await authService.resetPassword(email, password);
    return res.status(200).json({
        status: httpStatus.NO_CONTENT,
        message: 'Đặt lại mật khẩu thành công!',
    });
});

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
};
