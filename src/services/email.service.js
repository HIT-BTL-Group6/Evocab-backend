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
    const text = `
    <h2>ECOCAB</h2>
    <h3>To reset your password, please enter the OTP code: ${emailToken}</h3>
    <h3> In case you do not wish to reset your password, please ignore this message.</h3>
    <h3>The code will expire within 1 minute.</h3>
    <h3>Thank you!</h3>
    `;
    await sendEmail(to, subject, text);
};

module.exports = {
    sendResetPasswordEmail,
    transporter,
    sendEmail,
};
