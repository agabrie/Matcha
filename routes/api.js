const express = require('express');
const router = express.Router();
// const create = require('../setup/createTables');
const { insertRecord } = require('../functions/InsertRecord');
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

	let query = `SELECT * FROM USERS
		INNER JOIN PROFILES ON USERS.ID = USERID
		`;
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
router.get('/users', async function (req, res, next) {
	console.log("get all users")
	let result = await Users.get.All();
	res.send(result);
});

/* get user based on display_name, email or id */
router.get('/users/:login', async function (req, res, next) {
	console.log("get user : ",req.params.login);
	let data = await Users.get.Single(req.params.login);
	console.log(data);
	res.send(data);
});

/*
** inserts a record of the user
** requires {name, surname, email, display_name, password}
*/
router.post('/users', async function (req, res, next) {
	console.log("register user")
	let locationData = await ip2location.fetch(await ipify({ useIPv6: false }));
	console.log(locationData);
	let result = await Users.insert.Single(req.body)
		.then(async (user) => {
			if (user.error)
				throw user.error
			let auth = await Auth.insert.Single(user.display_name, req.body)
				.then((auth) => {
					if (auth.error)
						throw auth.error
					return auth
				})
				.catch(error => { return { error } })
				return({user,auth})
		})
		.catch(error => { return { error } })
	res.send(result);
});

/*
** updates a record based on display_name, email or id
** requires at least one of {name, surname, display_name, password}
*/
router.put('/users/:login', async function (req, res, next) {
	let result = await Users.update.Single(req.params.login, req.body);
	res.send(result);
});

/*
** logs in the user based on display_name, email or id
**	requires {password}
*/
router.post('/login', async function (req, res, next) {
	console.log("login user")
	let results = await Users.validate.Password(req.body.display_name, req.body.password);
	if (results.user) {
		results.user.password = null;
	}
	console.log("success", results);
	res.send(results);
});

/*
** returns the current user logged in
*/
router.get('/login', async (req, res, next) => {
	if (req.session.isLoggedIn) {
		res.send(req.session.user);
	} else {
		res.send(false);
	}
})

/* gets all profiles */
router.get('/profiles/', async function (req, res, next) {
	console.log("profiles get");

	let results = await Profiles.get.All();
	res.send(results);
});

/* gets a single profile based on display_name, id,email */
router.get('/profiles/:login', async function (req, res, next) {
	console.log("profile get single");

	let results = await Profiles.get.Single(req.params.login);
	res.send(results);
});

/*updates a single profile*/
router.put('/profiles/:login', async function (req, res, next) {
	console.log("profile update");

	let results = await Profiles.update.Single(req.params.login, req.body);
	res.send(results);
});

/* inserts a single profile linked to a user based on display_name, id or email*/
router.post('/profiles/:login', async function (req, res, next) {
	console.log("profile insert");

	let results = await Profiles.insert.Single(req.params.login, req.body);
	res.send(results);
});
/* gets all auth info with their usernames */
router.get('/auth/', async function (req, res, next) {
	console.log("auth get");

	let results = await Auth.get.All();
	res.send(results);
});

/* gets a single user's auth info */
router.get('/auth/:login', async function (req, res, next) {
	console.log("auth get single");

	let results = await Auth.get.Single(req.params.login);
	res.send(results);
});

/* updates a users auth info */
router.put('/auth/:login', async function (req, res, next) {
	console.log("auth update");
	// console.log("req.body => ", req.body);
	let results = await Auth.update.Single(req.params.login, req.body);
	res.send(results);
});

/* inserts a new auth record linked to a user based on display_name, id or email */
router.post('/auth/:login', async function (req, res, next) {
	console.log("auth insert");

	let results = await Auth.insert.Single(req.params.login, req.body);
	res.send(results);
});

/* test endpoint for sending user emails */
router.post('/verify', async function (req, res, next) {
	console.log("verifying user")
	let user = await Auth.get.Single(req.body.mail)
	// console.log(result.token);
	// console.log(req.body.token);
	if (user.token === req.body.token) {
		let result = await Auth.update.Single(user.display_name, { verified: true })
		res.send(result)
	}
	else{
		res.send({error:"verification token does not match"});
	}
	// let message = {
	// 	to:req.params.address,
	// 	subject:"Matcha Email",
	// 	text:"a mail for you"
	// }
	// let results = await sendMail(message);
	// console.log(req.params);
})

/* in progress receives an image to uploaded */
router.get('/images/:login', async function (req, res, next) {
	console.log("pics get")
	let images = await Images.get.Single(req.params.login);
	// console.log("images => ",images)
	res.send(images)
})

router.post('/images/:login', async function (req, res, next) {
	console.log("pic upload")
	// console.log("body=>",req.body)
	// console.log(req.files)
	try {
		if (!req.body) {
			console.log("no file")
			res.send({
				status: false,
				message: 'No file uploaded'
			});
		}
		else {
			console.log(req.body)
			let image = await Images.insert.Single(req.params.login, req.body);
			// console.log("successfully uploaded : ",image);
			res.send(image)
		}
	} catch (err) {
		res.status(500).send(err);
	}
})

router.post('/views/:login', async function (req, res, next) {
	console.log("Views insert");

	let results = await Views.insert.Single(req.params.login, req.body);
	// console.log("",results)
	res.send(results);
});

/*
** do a filter and sort based on the following parameters
**	preferences:{
**		sexual_preference,
**		age:{
**			current,
**			min,
**			max
**		},
**		gender:Female
**	},
**	sort:{
**		age_diff:1,
**	}
*/


router.get('/search/unsorted/', async (req, res, next) => {
	let users = await Users.get.Verified.unsorted();
	users = formatResponse.User.Multiple(users)
	res.send(users);
});

router.get('/search/', async (req, res, next) => {
	console.log("search");
	let age = 20;
	let conditions = req.body.preferences;
	let numConditions = 0;
	if (conditions)
		numConditions = Object.keys(conditions).length;
	// let preferences = req.body.sexual_preference;
	// let filter_on_preferences = '';
	let logic = '';
	let i = 0;
	if (conditions) {
		for (condition in conditions) {
			let element = conditions[conditions];
			// console.log("conditions => ", `${condition} : ${element}`);
			logic += `WHERE ${condition} = $${element}`;
			if (i == numConditions)
				break;
			logic += " \n\tAND ";
			i++;
		}
	}
	let sort_by = '';
	let query = `
		SELECT *,EXTRACT(YEAR from AGE(date_of_birth)) as "age", ABS(EXTRACT(YEAR from AGE(date_of_birth)) - ${conditions.age.current}) as "age_diff" FROM USERS
		INNER JOIN PROFILES ON USERS.ID = USERID
		WHERE EXTRACT(YEAR from AGE(date_of_birth)) BETWEEN ${conditions.age.min} AND ${conditions.age.max}
		ORDER BY age_diff ASC, age ASC;
		`;
	// ${logic}
	// ${sort_by}
	console.log(query);
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
router.post('/like/:login', async function (req, res, next) {
	console.log("like profile");

	let results = await Views.update.Single(req.params.login, req.body);
	res.send(results);
});
router.get("/search/:login", async (req, res, next) => {
	let users = await Users.get.Entire(req.params.login);
	console.log("user => ",users)
	formatResponse.User.Single(users);
	res.send(users);
});

router.get("/forgotpass", async(req, res, next) => {
	let user = await Users.get.Single(req.body.login);
	forgotPassEmail(user);
	res.send(user);
})

router.post("/resetpass/:login", async(req, res, next) => {
	console.log('==>>', req.body);
	let result = await Users.update.Single(req.params.login, req.body);
	res.send(result);
})

router.get("/location", async(req, res, next) => {
	let locationData = await ip2location.fetch(await ipify({ useIPv6: false }));
	console.log(locationData);
	res.send(locationData);
})

module.exports = router;