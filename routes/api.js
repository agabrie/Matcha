const express = require("express");
const router = express.Router();
// const create = require('../setup/createTables');
const { insertRecord } = require("../functions/InsertRecord");
// const User = require('../models/User');
const { Profiles } = require('../functions/Tables/Profile');
const { Auth } = require('../functions/Tables/Auth');
const { Users } = require('../functions/Tables/User');
const { client } = require('../dbConnection');
const { sendMail } = require('../functions/sendMail');
const { Views } = require('../functions/Tables/Views')
const { Images } = require('../functions/Tables/Images')
const { formatResponse } = require('../functions/formatResponse');
// const { default: ForgotPass } = require('../front_end/src/components/pages/ForgotPass');
const {forgotPassEmail} = require('../functions/forgotPass');
const ipify = require("ipify");
var ip2location = require('ip-to-location');

/* get a single user's data with their profile */
router.get('/users/:login/all', async function (req, res, next) {
	console.log("fetch user data");
	let user = await Users.get.Single(req.params.login);
	let query = `SELECT * FROM USERS
		INNER JOIN PROFILES ON USERS.ID = PROFILES.USERID
		INNER JOIN AUTH ON USERS.ID = AUTH.USERID
		WHERE USERS.id = ${user.id}
		;`;
	let results = await client.query(query)
		.then(result => {
			console.log(result.rows)
			return result.rows;
		})
		.catch(err => {
			console.log({ "sql error": err });
			return ({ error: err.detail });
		});
	res.send(results);
});

/* get All users */
router.get("/users", async function (req, res, next) {
	console.log("get all users");
	let result = await Users.get.All();
	result = formatResponse.User.Multiple(result);
	if (!result) res.send({ error: "no users in database" });
	res.send(result);
});

/* get single user based on display_name, email or id */
router.get("/users/:login", async function (req, res, next) {
	console.log("get user : ", req.params.login);
	let result = await Users.get.Single(req.params.login);
	console.log(result);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/*
 ** inserts a record of the user
 ** requires {name, surname, email, display_name, password}
 */
router.post("/users", async function (req, res, next) {
	console.log("register user");
	let result = await Users.insert
		.Single(req.body)
		.then(async (user) => {
			if (user.error) throw user.error;
			let auth = await Auth.insert
				.Single(user.display_name, req.body)
				.then((auth) => {
					if (auth.error) throw auth.error;
					return auth;
				})
				.catch((error) => {
					return { error };
				});
			return { user, ...auth };
		})
		.catch((error) => {
			return { error };
		});
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/*
 ** updates a record based on display_name, email or id
 ** requires at least one of {name, surname, display_name, password}
 */
router.put("/users/:login", async function (req, res, next) {
	console.log("update user ! ",req.body);
	let result = await Users.update.Single(req.params.login, req.body);
	result = formatResponse.User.Single(result);
	res.send(result);
});

/***************************** PROFILES ***********************************/
router.get("/profiles/:login/all", async (req, res, next) => {
	let result = await Profiles.get.Entire(req.params.login);
	// console.log("user => ", result);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	// console.log("result=>", result);
	res.send(result);
});
/* gets all profiles */
router.get("/profiles/", async function (req, res, next) {
	console.log("profiles get");

	let result = await Profiles.get.All();
	result = formatResponse.User.Multiple(result);
	if (!result) res.send({ error: "no such users in database" });
	res.send(result);
});

/* gets a single profile based on display_name, id,email */
router.get("/profiles/:login", async function (req, res, next) {
	console.log("profile get single");

	let result = await Profiles.get.Single(req.params.login);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/*updates a single profile*/
router.put("/profiles/:login", async function (req, res, next) {
	console.log("profile update");

	let result = await Profiles.update.Single(req.params.login, req.body);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/* inserts a single profile linked to a user based on display_name, id or email*/
router.post("/profiles/:login", async function (req, res, next) {
	console.log("profile insert");

	let result = await Profiles.insert.Single(req.params.login, req.body);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/***************************** AUTH *******************************/
/* checks if user is verified */
router.get("/auth/verify/:login", async function (req, res, next) {
	console.log("testing user verification");
	let result = await Auth.get.Single(req.params.login);

	// if (result.token === req.body.token) {
	result = await Auth.get.Single(result.display_name);
	result = formatResponse.User.Single(result);
	console.log(result);
		if (!result) res.send({ error: "no such user in database" });
		res.send(result);
	// } else {
		// res.send({ error: "verification token does not match" });
	// }
});
/* verifies user token */
router.post("/auth/verify", async function (req, res, next) {
	console.log("verifying user",req.body);
	let result = await Auth.get.Single(req.body.login);
	console.log(result)
	console.log(result.token,req.body.token)
	if (result.token === req.body.token) {
		result = await Auth.update.Single(result.display_name, {
			verified: true,
		});
		result = formatResponse.User.Single(result);
		if (!result) res.send({ error: "no such user in database" });
		res.send(result);
	} else {
		res.send({ error: "verification token does not match" });
	}
});
/* gets all auth info with their usernames */
router.get("/auth/", async function (req, res, next) {
	console.log("auth get");

	let result = await Auth.get.All();
	result = formatResponse.User.Multiple(result);
	if (!result) res.send({ error: "no such user in database" });

	res.send(result);
});

/* gets a single user's auth info */
router.get("/auth/:login", async function (req, res, next) {
	console.log("auth get single",req.params);
	// let user = await Users.get.Single(req.params.login)
	let result = await Auth.get.Single(req.params.login);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/* updates a users auth info */
router.put("/auth/:login", async function (req, res, next) {
	console.log("auth update");
	// console.log("req.body => ", req.body);
	let result = await Auth.update.Single(req.params.login, req.body);
	console.log(result);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/* inserts a new auth record linked to a user based on display_name, id or email */
router.post("/auth/:login", async function (req, res, next) {
	console.log("auth insert");

	let result = await Auth.insert.Single(req.params.login, req.body);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/******************************** images **************************************/
/* in progress receives an image to uploaded */
router.get("/images/:login", async function (req, res, next) {
	console.log("pics get");
	let result = await Images.get.Single(req.params.login);
	// console.log("images => ",images)
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

router.post("/images/:login", async function (req, res, next) {
	console.log("pic upload");
	// console.log("body=>",req.body)
	// console.log(req.files)
	try {
		if (!req.body) {
			console.log("no file");
			res.send({
				status: false,
				message: "No file uploaded",
			});
		} else {
			// console.log(req.body);
			let result = await Images.insert.Single(req.params.login, req.body);
			// console.log("successfully uploaded : ",image);
			result = formatResponse.User.Single(result);
			if (!result) res.send({ error: "no such user in database" });
			res.send(result);
		}
	} catch (err) {
		res.status(500).send(err);
	}
});
router.delete("/images/:login", async function (req, res, next) {
	console.log("deleting an image")
	let rank = req.body.rank;
	console.log(req.body,req.params.login)
	let result = await Images.delete.rank(req.params.login,rank,null);
	res.send(result);

})
/***************************** views *********************************/
router.get("/views/:login/likes", async function (req, res, next) {
	console.log("likes get on this user");

	let result = await Users.get.ViewedBy.Others(req.params.login);
	result = formatResponse.User.Multiple(result);
	// result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});
router.get("/views/:login/matches", async function (req, res, next) {
	console.log("matches get on this user");

	let result = await Users.get.Matches(req.params.login);
	result = formatResponse.User.Multiple(result);
	// result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});
router.get("/views/:login", async function (req, res, next) {
	console.log("Views get by user");

	let result = await Users.get.ViewedBy.Self(req.params.login);
	result = formatResponse.User.Multiple(result);
	// result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});
router.post("/views/:login", async function (req, res, next) {
	console.log("Views insert");
	let result = await Views.insert.Single(req.params.login, req.body);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});
/* switched to put request */
router.put("/views/:login", async function (req, res, next) {
	console.log("like profile");

	let result = await Views.update.Single(req.params.login, req.body);
	result = formatResponse.User.Single(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

/****************************** LOGIN **************************************/

/*
 ** logs in the user based on display_name, email or id
 **	requires {password}
 */
router.post("/login", async function (req, res, next) {
	console.log("login user");
	console.log(req.body)
	let login = req.body.login;
	let password = req.body.password
	let result = await Users.validate.Password(
		login,
		password
	);
	if (result.user) {
		result.user.password = null;
	} else {
		res.send(result)
	}
	await Auth.update.Single(login, {loggedin:true});
	console.log("success", result);
	result = formatResponse.User.Single(result.user);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});
router.post("/logout", async function (req, res, next) {
	let login = req.body.login;
	console.log("logout user");
	await Auth.update.Single(login, {loggedin:false});
})
router.post("/report", async function (req, res, next) {
	let login = req.body.login;
	console.log("report user");
	await Auth.update.Single(login, { verified: false });
});
/*
 ** returns the current user logged in
 */
router.get("/login", async (req, res, next) => {
	if (req.session.isLoggedIn) {
		res.send(req.session.user);
	} else {
		res.send(false);
	}
});

/*****************************search*********************************/

/*
 ** do a filter and sort based on the following parameters
 **	{
 **		"profile":{
 **			"age":<calculated from dob>,
 **			"gender":<Male,Female>,
 **			"location":<point()>
 **		},
 **		"preferences":{
 **			"sexual_preference": <Male,Female,Both>,
 **			"age":{
 **					"min":<minimum age>,
 **					"max":<maximum age>
 **			}
 **		},
 **		"sortby":[ <multiple options supported>
 **			{
 **				"filter":<name of field> <age_diff,fame,age,gender,sexual_preference,distance(in progress)>
 **				"direction":<DESC or ASC>
 **			}
 **		]
 **	}
 */

router.post("/search/", async (req, res, next) => {
	console.log("Search Time!");
	// if (req.body.display_name) {
		// console.log("req.body!",req.body);
		// res.send({});
		// return;
	// }
	console.log("search",req.body);
	// let age = 20;
	// if (req.body.profiles == null)res.send({ error: "no user profile" })
	// if (req.body.preferences == null) res.send({ error: "no user preferences" });
	// if (req.body.profiles == null) res.send({ error: "no user profile" });
	let profile = { age: 30, gender: "Male", location: "(0,0)" };
	if (req.body.profile)
		profile = req.body.profile;
	let { display_name } = req.body
	let preferences = { sexual_preference: "Both", age: { min: 18, max: 68 } };
	if (req.body.preferences) preferences = req.body.preferences;
	if (req.body.preferences)
		preferences = req.body.preferences;
		let conditions = [
		{ filter: "age", direction: "ASC" },
		{ filter: "age_diff", direction: "ASC" },
		{ filter: "gender", direction: "ASC" },
		{ filter: "fame", direction: "DESC" },
	];
	if (req.body.sortby) conditions = req.body.sortby;
	
	// console.log(profile, preferences.age);

	let numConditions = 0;
	if (conditions) numConditions = Object.keys(conditions).length;
	let sortby = "ORDER BY";
	let i = 0;
	if (conditions) {
		for (condition in conditions) {
			let element = conditions[condition];
			console.log(element);
			sortby += ` ${element.filter} ${element.direction}`;
			if (i == numConditions - 1) break;
			sortby += ", ";
			i++;
		}
	}
	console.log("sortby => ", sortby);
	let agefilter = `WHERE age BETWEEN ${preferences.age.min} AND ${preferences.age.max}`;
	let sexfilter = `AND ${
		preferences.sexual_preference != "Both"
			? `gender = '${preferences.sexual_preference}'`
			: "((gender = 'Male') OR (gender = 'Female'))"
	}`;
	let genderfilter = `AND ((sexual_preference = 'Both') OR (sexual_preference = '${profile.gender}'))`;

	let query = `
	SELECT
		USERS.id,
		USERS.display_name,
		IMAGES.type,
		IMAGES.data,
		PROFILES.gender,
		PROFILES.date_of_birth,
		PROFILES.fame,
		PROFILES.age,
		PROFILES.gender,
		PROFILES.sexual_preference,
		PROFILES.age_diff
	FROM USERS
	INNER JOIN AUTH ON USERS.id = AUTH.userId
	INNER JOIN IMAGES ON USERS.id = IMAGES.userId
	INNER JOIN (
		SELECT *, 
		EXTRACT(YEAR from AGE(date_of_birth)) as "age",
		ABS(EXTRACT(YEAR from AGE(date_of_birth)) - ${profile.age}) as "age_diff" FROM PROFILES
	) as PROFILES ON USERS.id = PROFILES.userId
	${agefilter}
	${sexfilter}
	${genderfilter}
	AND Views.blocked = 'false'
	AND AUTH.verified = 'TRUE' AND IMAGES.rank = '1'
	AND Users.display_name != '${display_name}'
	${sortby}
	`;
	// ORDER BY age_diff ASC, fame DESC, age ASC;
	console.log(query);
	let result = await client
		.query(query)
		.then((result) => {
			console.log(result.rows);
			return result.rows;
		})
		.catch((err) => {
			console.log({ "sql error": err });
			return { error: err.detail };
		});
	result = formatResponse.User.Multiple(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

router.get("/search/:login/unsorted", async (req, res, next) => {
	// console.log("unsorted!",req)
	let result = await Users.get.Verified.unsorted(req.params.login);
	result = formatResponse.User.Multiple(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});

router.post("/forgotpass", async (req, res, next) => {
	console.log(req.body);
	let user = await Users.get.Single(req.body.login);
	console.log("user->",user);
	forgotPassEmail(user);
	res.send(user);
})

router.post("/resetpass/:login", async(req, res, next) => {
	console.log('==>>', req.body);
	let result = await Users.update.Single(req.params.login, req.body);
	res.send(result);
})

router.get("/location", async (req, res, next) => {
	console.log("get Location!");
	// console.log(req);
	let locationData = await ip2location.fetch(await ipify({ useIPv6: false }));
	console.log("location data!",locationData);
	res.send(locationData);
})

module.exports = router;
router.get("/search/sorted/age", async (req, res, next) => {
	let result = await Users.get.Verified.sorted.age();
	result = formatResponse.User.Multiple(result);
	if (!result) res.send({ error: "no such user in database" });
	res.send(result);
});
module.exports = router;
