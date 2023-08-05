const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

const extractTokenFromHeader = (request) => {
    const authorizationHeader = request.headers.authorization;
    const [type, accessToken] = authorizationHeader ? authorizationHeader.split(' ') : [];
    return type === 'Bearer' ? accessToken : undefined;
};

const authMiddleware = catchAsync(async (req, res, next) => {
    const accessToken = extractTokenFromHeader(req);
    if (!accessToken) {
        throw new ApiError('Phiên bản hết hạn. Vui lòng đăng nhập lại!', httpStatus[401]);
    }
    const payload = jwt.verify(accessToken, process.env.SECRET_KEY || 'evocabbackend');
    if (!payload) throw new ApiError('Vui lòng xác thực!', httpStatus[401]);
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Không tìm thấy người dùng!', httpStatus[401]);

    req.accessToken = accessToken;
    req.user = user;
    next();
});

module.exports = authMiddleware;