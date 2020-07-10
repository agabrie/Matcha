const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');

const { Password } = require('../Password');

const getAllUsersData = async () => {
	const query = `SELECT * FROM USERS;`;
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

const getUserFromLogin = async (detail) => {
	let query = `SELECT * FROM USERS WHERE `;
	if (isNaN(detail))
		query += `display_name = '${detail}' OR email = '${detail}';`;
	else
		query += `id = '${detail}'`;

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
	console.log(result);
	return result;
}

const insertUser = async (data) => {
	const values = validateData(data);
	const query = InsertRecord("Users", values, null);
	
	if (query.errors) {
		return({ error: query.errors });
	}

	let results = await client.query(query.string, query.values)
	.then(result => {
		return result.rows[0];
	})
	.catch(error => {
		console.log(error);
		if(error.detail)
			return ({ error: error.detail});
		return ({ error: error});
	});

	return results;
};

const updateUser = async (login, data) => {
	const values = validateUpdateData(data);
	let user = await Users.get.Single(login)
	.then(async (user) => {
		let query = await UpdateRecord("Users", values, { id: user.id });
		let results = await client.query(query.string, query.values)
		.then(result => {
			return result.rows[0];
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

const validateData = (data) => {
	try {
		if (!(data.name && data.surname && data.email && data.display_name && data.password))
			throw "some user fields incorrectly filled in or missing!";
		let validData = {
			name: data.name,
			surname: data.surname,
			email: data.email,
			display_name: data.display_name,
			password: Password.encode_password(data.password)
		}
		return validData;
	}
	catch (err) {
		return ({ error: err });
	}
}

const validateUpdateData = (data) => {
	let validData = {}
	if (data.name)
		validData.name = data.name;
	if (data.surname)
		validData.surname = data.surname;
	if (data.display_name)
		validData.display_name = data.display_name;
	if (data.password)
		validData.password = Password.encode_password(data.password);
	return (validData);
}

const validatePassword = async (login, password) => {
	let result = await Users.get.Single(login)
	.then((user) => {
		return Password.validate(password, user);
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	return result;
};

let Users = {
	get : {
		Single: getUserFromLogin,
		All: getAllUsersData
	},
	validate : {
		Password: validatePassword
	},
	insert : {
		Single: insertUser
	},
	update : {
		// name: {},
		// surname: {},
		// display_name: {},
		// password: {},
		Single: updateUser
	}
}

module.exports = { Users }