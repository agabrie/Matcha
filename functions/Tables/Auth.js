const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');
const { Password } = require('../Password');
const { sendMail } = require('../sendMail');
require('dotenv').config();

const getAuthFromLogin = async (login) => {
	let user = await Users.get.Single(login)
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});

	const query =
	`SELECT
	Users.display_name,
	Users.email,
	Auth.*
	FROM Users
	INNER JOIN Auth ON Users.id = Auth.userId 
	WHERE Auth.userId = ${user.id};
	`;

	let result = await client.query(query)
	.then(result => {
		return result.rows[0];
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	return result;
};

const getAllAuthData = async () => {
	const query =
	`SELECT
	Users.display_name,
	Users.email,
	Auth.*
	FROM Users
	INNER JOIN Auth ON Users.id = Profiles.userId
	`;
	let result = await client.query(query)
	.then(result => {
		return result.rows;
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	return result;
}

const insertAuth = async (login, data) => {
	let user = await Users.get.Single(login)
		.then((res) => {
			if (res.id)
				return res
			else
				throw { error: "no id" }
		})
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
		});

	if (user.error)
		return { error: user.error };

	const values = validateData(user);
	const query = InsertRecord("Auth", { ...values, ...{ userId: user.id } }, null);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}

	let results = await client.query(query.string, query.values)
	.then(async result => {
		let results = await Auth.get.Single(login);
		return results;
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	if (!data.nomail)
		await verifyEmail(login);
	
	return results;
};

const updateAuth = async (login, data) => {
	
	const values = validateData(data);
	
	let user = await Auth.get.Single(login)
	.then(async (user) => {
		let query = await UpdateRecord("Auth", values, { id: user.id });
		let results = await client.query(query.string, query.values)
		.then(async result => {
			let results = await Auth.get.Single(login);
			return results;
		})
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
		});
		return results;
	})
	return user;
}
const verifyEmail = async (loginDetails) => {
	const frontend = {
		host: process.env.ClientHost,
		port: process.env.ClientPort
		// host: process.env.host,
		// port: process.env.port
	}
	let user = await Auth.get.Single(loginDetails)
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
		});
	let url = `http://${frontend.host}:${frontend.port}/api/verify?mail=${user.email}&token=${encodeURIComponent(user.token)}`
	let message = {
		to: user.email,
		subject: "Matcha Verification",
		text: {
			header: `<h3>Hi ${user.display_name}!</h3>`,
			body: `click <a href='${url}'>here</a> to verify your account or alternatively use the following link ${url}`,
			foot: ``
		}
	}
	let results = await sendMail(message);
	return results;
}

const validateData = (data) => {
	let valid = {}
	if (data.verified)
		valid.verified = data.verified;
	if (data.notifications)
		valid.notifications = data.notifications;
	if (data.loggedin)
		valid.loggedin = data.loggedin;
	if (data.id)
		valid.userId = data.id;
	if (data.display_name) 
		valid.token = Password.encode_password(data.display_name);
	return valid;
}

let Auth = {
	get : {
		Single: getAuthFromLogin,
		All: getAllAuthData
	},
	validate : {
		// Password:validatePassword
	},
	insert : {
		Single: insertAuth
	},
	update : {
		// name:{},
		// surname:{},
		// display_name:{},
		// password:{},
		Single: updateAuth
	}
}

module.exports = { Auth }