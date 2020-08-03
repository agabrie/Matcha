const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');

const getAllTagsData = async () => {
	const query =
		`SELECT
        *
	FROM Tags
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
const insertTag = async (login, data) => {
	console.log("view data =>",login,data)
	let user = await Users.get.Single(login)
	let views = await Views.get.Single(login)
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
	const query = InsertRecord("Tags", { ...values, ...{ userId: user.id } }, null);
	console.log("query =>",query);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(async result => {
			let results = await Views.get.Single(login);
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
	if (data.tag) {
		valid.tag = data.tag;
	}
	return valid;
}
let Views = {
	get : {
		All: getAllTagsData
	},
	validate: {
		// Password:validatePassword
	},
	insert: {
		Single: insertTag
	},
	update :{
		// name:{},
		// surname:{},
		// display_name:{},
		// password:{},
		// Single: updateView
	}
}

module.exports = { Tags }