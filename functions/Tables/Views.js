const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');

const getMatchesFromlogin = async (login1, login2) => {
	let user1 = await Users.get.Single(login1);
	let user2 = await Users.get.Single(login1)
	.then((res) => {
		return res.result
	})
const query =
	`SELECT
	Users.display_name,
	Users.email,
	Views.*
	FROM Users
	INNER JOIN Views ON Users.id = Views.userId 
	WHERE views.liked = true AND (views.userid = ${user1.id} AND views.viewd  =  ${user2.id})
`;
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

const getViewFromLogin = async (login) => {
	let user = await Users.get.Single(login)
		.then((res) => {
			return res.result
		})
	const query =
		`SELECT
		Users.display_name,
		Users.email,
		Views.*
	FROM Users
	INNER JOIN Views ON Users.id = Views.userId 
	WHERE Views.userId = ${user.id};
	`;
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
};

const getAllViewsData = async () => {
	const query =
		`SELECT
		Users.display_name,
		Users.email,
		Views.*
	FROM Users
	INNER JOIN Views ON Users.id = Views.userId
	`;
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

const insertView = async (login, data) => {
	let user = await Users.get.Single(login)
		.then((res) => {
			if (res.result.id)
				return res.result
			else
				throw { error: "no id" }
		})
		.catch((err) => { return { error: err }; })
	if (user.error)
		return { error: user.error };
	const values = validateData(data);
	// console.log("values => ",values)
	const query = InsertRecord("Views", { ...values, ...{ userId: user.id } }, null);
	// console.log(query);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(async result => {
			// console.log(result.rows)
			// return result.rows[0];
			let results = await Views.get.Single(login);
			return results;
		})
		.catch(err => {
			console.log({ "sql error": err });
			return ({ error: err.detail });
		});
	return results;
};

const updateView = async (login, data) => {
	const values = validateData(data);
	let user = await View.get.Single(login)
		.then((res) => {
			return res.result
		})
		.then(async (user) => {
			// console.log("update => ",user);
			let query = await UpdateRecord("Views", values, { id: user.id });
			// console.log(query);
			let results = await client.query(query.string, query.values)
				.then(async result => {
					console.log(result.rows)
					// return result.rows[0];
					let results = await Views.get.Single(login);
					return results;
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
	let valid = {}
	if (data.viewed) {
		/*
		if(data.gender == "Male")
			valid.gender = 1;
		else
			valid.gender = 2;
		*/
		valid.viewed = data.viewed;
	}
	if (data.liked) {
		valid.liked = data.liked;
	}
	if (data.userId)
		valid.userId = data.userId;
	return valid;
}
let get = {
	Single: getViewFromLogin,
	All: getAllViewsData
}

let validate = {
	// Password:validatePassword
}

let insert = {
	Single: insertView
}

let update = {
	// name:{},
	// surname:{},
	// display_name:{},
	// password:{},
	Single: updateView
}
let Views = {
	get,
	validate,
	insert,
	update
}

module.exports = { Views }