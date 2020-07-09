const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');

const { Password } = require('../Password');

const getAllUsersData = async () => {
	const query = `SELECT * FROM USERS;`;
	let result = await client.query(query)
		.then(result => {
			return { result: result.rows };
			// console.log(result.rows)
			// res.send(result.rows);
		})
		.catch(err => {
			return { error: err };
			// console.log({"sql error":err});
			// res.send({error:err})
		});
	return result;
}

const getUserFromLogin = async (detail) => {
	let query = `SELECT * FROM USERS WHERE `;
	if (isNaN(detail))
		query += `display_name = '${detail}' OR email = '${detail}';`;
	else
		query += `id = '${detail}'`;
	// console.log(query);

	let result = await client.query(query)
		.then(result => {
			return { result: result.rows[0] };
			// console.log(result.rows)
			// res.send(result.rows);
		})
		.catch(err => {
			return { error: err };
			// console.log({"sql error":err});
			// res.send({error:err})
		});
	return result;
}

const insertUser = async (data) => {
	const values = validateData(data);
	const query = InsertRecord("Users", values, null);
	// console.log(query);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(result => {
			// console.log(result.rows)
			return result.rows[0];
		})
		.catch(err => {
			console.log({ "sql error": err, data });
			return ({ error: err.detail });
		});
	return results;
};

const updateUser = async (login, data) => {
	const values = validateUpdateData(data);
	let user = await Users.get.Single(login)
		.then((res) => {
			return res.result
		})
		.then(async (user) => {
			// console.log("update => ",user);
			let query = await UpdateRecord("Users", values, { id: user.id });
			// console.log(query);
			let results = await client.query(query.string, query.values)
				.then(result => {
					// console.log(result.rows)
					return result.rows[0];
				})
				.catch(err => {
					console.log({ "sql error": err });
					return ({ error: err.detail });
				});
			return results;
		})
	return user;
}

const validateData = (data) => {
	// console.log(data);
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
		// console.log(err);
		return ({ error: err });
	}
	// console.log("validated : ",validData);
	// return validData;
}

const validateUpdateData = (data) => {
	// console.log(data);
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
		.then((res) => { console.log(results); return res.result })
		.then((user) => {
			return Password.validate(password, user);
		})
		.catch((error) => {
			console.log(error)
			return (error);
		});
	return result;
};

let get = {
	Single: getUserFromLogin,
	All: getAllUsersData
}

let validate = {
	Password: validatePassword
}

let insert = {
	Single: insertUser
}

let update = {
	name: {},
	surname: {},
	display_name: {},
	password: {},
	Single: updateUser
}
let Users = {
	get,
	validate,
	insert,
	update
}

module.exports = { Users }