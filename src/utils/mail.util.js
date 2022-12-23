const nodemailer = require('nodemailer');
const { config } = require('../config');

async function sendMail(configMail) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  const info = await transporter.sendMail({
    from: `"Carlos Córdova 👻" <${config.mailUser}>`,
    ...configMail,
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = { sendMail };
