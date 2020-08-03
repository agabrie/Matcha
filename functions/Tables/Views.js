const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');

const getMatchesFromlogin = async (login1, login2) => {
	let user1 = await Users.get.Single(login1);
	let user2 = await Users.get.Single(login1)
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
		return result.rows ;
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
return result;
}

const getViewFromLogin = async (login) => {
	let user = await Users.get.Single(login)
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
const checkViewed = (viewed,views) => {
	let a;
	views.forEach((view) => {
		// console.log("checking here!",view.viewed,viewed)
		if (view.viewed == viewed) {
			a = view;
		}
	})
	return a;
}
const cv = (viewed) => {

}
const insertView = async (login, data) => {
	// console.log("view data =>",login,data)
	let user = await Users.get.Single(login)
	let views = await Views.get.Single(login)
	// console.log("views => ", views);
	// console.log("data => ",data);
	// .then((res) => {
		// 	if (res.id)
		// 		return res
		// 	else
		// 		throw { error: "no id" }
		// })
		// .catch((err) => { return { error: err }; })
		// console.log("user =>", views);
		if (user.error)
		return { error: user.error };
		// console.log("data => ", data);
		const values = validateData(data);
	// console.log("values =>", values);
	let cv = checkViewed(values.viewed, views);
	// console.log("checkviewed ",cv);
	if (cv) {
		return cv;
	}
	const query = InsertRecord("Views", { ...values, ...{ userId: user.id } }, null);
	// console.log("query =>",query);
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

const updateView = async (login, data) => {
	const values = validateData(data);
	let user = await Views.get.Single(login)
		.then(async (user) => {
			console.log(user)
			let query = await UpdateRecord("views", values, { userid: user[0].userid });
			console.log(query);
			let results = await client.query(query.string, query.values)
				.then(async result => {
					console.log("here => ",result)
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
		})
	return user;
}
const validateData = (data) => {
	let valid = {}
	if (data.userId) {
		valid.userId = data.userId;
	}
	if (data.viewed) {
		valid.viewed = data.viewed;
	}
	if (data.liked) {
		valid.liked = data.liked;
	}
	if (data.likedback) {
		valid.likedback = data.likedback;
	}
	if (data.userId)
		valid.userId = data.userId;
	return valid;
}
let Views = {
	get : {
		Single: getViewFromLogin,
		All: getAllViewsData
	},
	validate: {
		// Password:validatePassword
	},
	insert: {
		Single: insertView
	},
	update :{
		// name:{},
		// surname:{},
		// display_name:{},
		// password:{},
		Single: updateView
	}
}

module.exports = { Views }