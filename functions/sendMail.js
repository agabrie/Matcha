/*
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (message) => {
	const mail = process.env;
	// let testAccount = await nodemailer.createTestAccount();
	// console.log(mail);
	// create reusable transporter object using the default SMTP transport
	
	let transporter = nodemailer.createTransport({
		host: mail.Mailhost,
		port: mail.Mailport,
		auth: {
			user: mail.Mailuser,
			pass: mail.Mailpass
		},
		tls: {
			rejectUnauthorized: true
		}
	});
	
	let MAIL_SERVER_URL = '127.0.0.0';
let transporter = nodemailer.createTransport({
    host: MAIL_SERVER_URL,
    connectionTimeout: 60000
});
	var mailOptions = {
		from: mail.Mailfrom,
		to: message.to,
		subject: message.subject,
		text: formatEmail(message.text)
	};

	// mailOptions.text = message;
	let result =
		await transporter.sendMail(mailOptions);

	, async function(error, info){
		if (error) {
		  console.log(error);
		  result = 
		  ({success:false,error:error});
		} else {
		  console.log('Email sent: ' + info.response);
		  result = ({success:true,info:info.response})
		}
	  }
	
	console.log(result);
	return result;
}
*/
const sendmail = require('sendmail')();
const sendMail = async (message) => {
sendmail({
    from: 'no-reply@yourdomain.com',
    to: message.to,
    subject: message.subject,
    html: message.text,
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
	});
};
const formatEmail = (message) => {
	let format =
		`<!DOCTYPE html>
		<head>
			<h1> Matcha </h1>
		<head>
		<body>
			${message}
			<button>OK</button>
		</body>
	<html>`;
	return format;
}
module.exports = { sendMail }