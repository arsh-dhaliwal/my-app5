const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/emailConfig');

// Create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure, // true for 465, false for other ports
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

// Send email function
const sendEmailAlert = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"ThermWatch Alert" <${emailConfig.user}>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmailAlert,
};