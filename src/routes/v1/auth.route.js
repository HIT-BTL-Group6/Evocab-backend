const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const { login, register, forgotPassword, resetPassword } = require('../../controllers/auth.controller');
const { getUser } = require('../../controllers/user.controller');

const authRouter = express.Router();

authRouter.route('/register').post(register);

authRouter.route('/login').post(login);

authRouter.use(authMiddleware);

authRouter.route('/me').get(getUser);

authRouter.route('/fotgot-password').post(forgotPassword);

authRouter.route('/reset-password').post(resetPassword);

module.exports = authRouter;