const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"SmartHire AI" <${process.env.SMTP_USER}>`,
      to, subject, text, html,
    });
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Email failed: ${error.message}`);
  }
};

module.exports = { sendEmail };
