const { createTransport } = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;
    const transporter = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: "79b031001@smtp-brevo.com",
            pass: process.env.BREVO_SMTP_KEY 
        },
    });

    const data = {
        from: 'Collab Connect <rsingh26@terpmail.umd.edu>',
        to,
        subject,
        text
    };

    transporter.sendMail(data, function(error, info){
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: error.message });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
};

module.exports = sendEmail;