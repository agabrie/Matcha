
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (message) => {
	const mail = process.env;
	// let testAccount = await nodemailer.createTestAccount();
	// console.log(mail.MailService,mail.MailUser,mail.MailPass);
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service:mail.MailService,
		// host: mail.Mailhost,
		// port: mail.Mailport,
		auth: {
			user: mail.MailUser,
			pass: mail.MailPass
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	
	/*let transporter = nodemailer.createTransport({
		service:'gmail',
		// host: mail.Mailhost,
		// port: mail.Mailport,
		auth: {
			user: "maktcha.wethinkcode@gmail.com",
			pass: "Maktcha123"
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	*/
	var mailOptions = {
		from: mail.MailFrom,
		replyTo: mail.MailFrom,
		to: message.to,
		subject: message.subject,
		html: formatEmail(message.text)
	};
	// console.log("sendMail => ",mailOptions);
	// mailOptions.text = message;
	let result =
		await transporter.sendMail(mailOptions);

	/*, async function(error, info){
		if (error) {
		  console.log(error);
		  result = 
		  ({success:false,error:error});
		} else {
		  console.log('Email sent: ' + info.response);
		  result = ({success:true,info:info.response})
		}
	  }
	*/
	// console.log(result);
	return result;
}

/*
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
*/
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