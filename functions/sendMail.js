
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (message) => {
	const mail = process.env;
	let transporter = nodemailer.createTransport({
		service: mail.MailService,
		auth: {
			user: mail.MailUser,
			pass: mail.MailPass
		},
		tls: {
			rejectUnauthorized: true
		}
	});
	var mailOptions = {
		from: mail.MailFrom,
		replyTo: mail.MailFrom,
		to: message.to,
		subject: message.subject,
		html: formatEmail(message.text)
	};
	let result =
		await transporter.sendMail(mailOptions);

	return result;
}

const formatEmail = (message) => {
	let format =
		`<!DOCTYPE html>
		<head>
			${message.header}
		</head>
		<body>
			${message.body}
		</body>
		<foot>
			${message.foot}
		</foot>
	</html>`;
	return format;
}
module.exports = { sendMail }