const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY, url:"https://api.eu.mailgun.net"});

const sendEmail = async (req, res) => {
    mg.messages.create('sandbox-123.mailgun.org', {
        from: "Excited User <mailgun@sandbox7df0086ae68941e7951c95432af4ea6b.mailgun.org>",
        to: ["arnavaggarwal907@gmail.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
//   const { to, subject, text } = req.body;

//   const data = {
//     from: 'Collab Connect <noreply@collabconnect.com>',
//     to,
//     subject,
//     text
//   };

//   console.log("Email data:", data);

//   try {
//     const response = await mg.messages.create(DOMAIN, data);
//     console.log("Mailgun response:", response);
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: error.message });
//   }
};


module.exports = sendEmail;