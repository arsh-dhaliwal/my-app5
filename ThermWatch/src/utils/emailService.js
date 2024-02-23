const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/emailConfig.json');

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

// Function to send an email alert
const sendEmailAlert = async (to, subject, text, html) => {
  // Setup email data with unicode symbols
  let mailOptions = {
    from: `"ThermWatch Alert" <${emailConfig.from}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  };

  // Send mail with defined transport object
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmailAlert,
};