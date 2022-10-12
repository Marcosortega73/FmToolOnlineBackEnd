const nodemailer = require("nodemailer");
const mailConfig = require('../../config/mail.config');

exports.config = mailConfig;
  
exports.sendMail = async (emailTo, subject, cuerpo) => {

  let transporter = nodemailer.createTransport({
    service: mailConfig.service,
    host: mailConfig.host,
    auth: mailConfig.auth,
    port: 465,
    //secure: false,
        tls: {
        rejectUnauthorized: false
    }
  });
 
  let info = await transporter.sendMail({
    from: mailConfig.email, // sender address,
    to: emailTo,
    subject: subject,
    // text: 'Hello World'
    html: cuerpo,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}