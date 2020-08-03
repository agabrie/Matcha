const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');

const getTagsFromLogin = async (login) => {
	let user = await Users.get.Single(login)
	const query =
		`SELECT
		Users.display_name,
		Users.email,
		ProfileTags.*
	FROM Users
	INNER JOIN ProfileTags ON Users.id = ProfileTags.userId 
	WHERE Tags.userId = ${user.id};
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
};

const getAllTagsData = async () => {
	const query =
		`SELECT
		Users.display_name,
		Users.email,
		ProfileTags.*
	FROM Users
	INNER JOIN ProfileTags ON Users.id = ProfileTags.userId
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

const insertProfileTag = async (login, data) => {
	console.log("view data =>",login,data)
	let user = await Users.get.Single(login)
	// .then((res) => {
		// 	if (res.id)
		// 		return res
		// 	else
		// 		throw { error: "no id" }
		// })
		// .catch((err) => { return { error: err }; })
		console.log("user =>", user);
		if (user.error)
		return { error: user.error };
		console.log("data => ", data);
		const values = validateData(data);
        console.log("values =>",values);
        
	const query = InsertRecord("Profiletags", { ...values, ...{ userId: user.id } }, null);
	console.log("query =>",query);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(async result => {
			let results = await Tags.get.Single(login);
			return results;
		})
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
		});
	return results;
};

const validateData = (data) => {
	let valid = {}
	if (data.userId) {
		valid.userId = data.userId;
	}
	if (data.TagId) {
		valid.TagId = data.TagId;
	}
	if (data.ProfileId) {
		valid.ProfileId = data.ProfileId;
	}
	if (data.userId)
		valid.userId = data.userId;
	return valid;
}
let Tags = {
	get : {
		Single: getTagsFromLogin,
		All: getAllTagsData
	},
	validate: {
		// Password:validatePassword
	},
	insert: {
		Single: insertProfileTag
	},
	// update :{
		// name:{},
		// surname:{},
		// display_name:{},
		// password:{},
		// Single: updateView
	// }
}

module.exports = { ProfileTags }