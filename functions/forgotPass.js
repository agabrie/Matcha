const { sendMail } = require('./sendMail');
require('dotenv').config();

const forgotPassEmail = async (user) => {
	console.log(user)
	const frontend = {
		host: process.env.ClientHost,
		port: process.env.ClientPort
	}
	let url = `http://${frontend.host}:${frontend.port}/resetpass?display_name=${user.display_name}`
	let message = {	to: user.email,
					subject: 'Matcha Forgot pass',
					text: {
						header: `<h3>Hi ${user.display_name}!</h3>`,
						body: `click <a href='${url}'>here</a> to Change your password ${url}`,
						foot: ``
					}
				}
	sendMail(message);
}

module.exports = { forgotPassEmail }