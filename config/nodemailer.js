require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Mail server connection error:', error);
  } else {
    console.log('✅ Zoho Mail server ready to send mails');
  }
});

module.exports = transporter;
