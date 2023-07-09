const moment = require('moment');
const jwt = require('jsonwebtoken');

const { Token } = require('../models');
const tokenTypes = require('../config/tokens');
const config = require('../config/config');
const logger = require('../config/logger');

const saveToken = async (token, tokenType, userId, expires) => {
    const tokenInfo = new Token({
        token,
        userId,
        expires: expires,
        tokenType,
    });

    return await tokenInfo.save();
};

const generateToken = (userId, secretKey, expires, type) => {
    const payload = {
        userId,
        type,
    };
    return jwt.sign(payload, secretKey, { expiresIn: expires });
};

const createAuthTokens = async (user) => {
    const accessTokenExpires = config.jwt.accessExpiresIn || '1h';
    const accessToken = generateToken(user.id, config.jwt.secret, accessTokenExpires, tokenTypes.ACCESS);

    let expires = new Date();
    expires.setHours(expires.getHours() + parseInt(accessTokenExpires));
    if (isNaN(expires)) {
        logger.error('Invalid expiration date.');
    }

    saveToken(accessToken, tokenTypes.ACCESS, user.id, expires);

    return {
        access: {
            token: accessToken,
            expires: expires,
        },
    };
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenInfo = await Token.findOne({ token, type, user: payload.userId });
    if (!tokenInfo) {
        throw new Error('Không tồn tại token');
    }
    return tokenInfo;
};

module.exports = {
    saveToken,
    generateToken,
    createAuthTokens,
    verifyToken,
};
