const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.smtp.auth.user,
        pass: config.email.smtp.auth.pass,
    },
});

/* istanbul ignore next */
if (config.env !== 'test') {
    transporter
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch((error) => logger.error(error));
}

const sendEmail = async (to, subject, text) => {
    const msg = { from: config.email.from, to, subject, text };
    await transporter.sendMail(msg);
};

const sendResetPasswordEmail = async (to, username, emailToken, type) => {
    const subject = type;
    const text = `Chào ${username},
  Để đặt lại mật khẩu, vui lòng nhập mã OTP sau: ${emailToken}  
  Trường hợp bạn không muốn đặt lại mật khẩu, xin vui lòng bỏ qua.
  Mã sẽ hết hạn trong vòng 1 phút.
  Xin cảm ơn`;
    await sendEmail(to, subject, text);
};

module.exports = {
    sendResetPasswordEmail,
    transporter,
    sendEmail,
};
