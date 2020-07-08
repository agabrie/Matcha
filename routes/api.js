const express = require('express');
const router = express.Router();
// const create = require('../setup/createTables');
const { insertRecord } = require('../functions/InsertRecord');
// const User = require('../models/User');
const {Profiles} = require('../functions/Profile');
const {Users} = require('../functions/User');
const {client} = require('../dbConnection');
// const {sendMail} = require('../functions/sendMail');
/*get all user data with profiles*/
router.get('/users/:login/all',async function(req,res,next){
	console.log("fetch user data");

	// let data = await Users.get.Single(req.params.login);
	// console.log(data);
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
			return({error:err.detail});
		});
	res.send(results);
});
router.get('/search/',async (req,res,next)=>{
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
	// if(preferences != 0){
		// filter_on_preferences = `WHERE PROFILES.GENDER = ${preferences}`;
	// }
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
			return({error:err.detail});
		});
	res.send(results);
});
/* get All users */
router.get('/users',async function(req,res,next){
	let result = await Users.get.All();
	res.send(result);
});
/* get user based on display_name, email or id */
router.get('/users/:login',async function(req,res,next){
	console.log("fetch users");

	let data = await Users.get.Single(req.params.login);
	console.log(data);
	res.send(data);
});

/*
** inserts a record of the user
** requires {name, surname, email, display_name, password}
*/
router.post('/users', async function (req, res, next) {
	let result = await Users.insert.Single(req.body);
	res.send(result);
});

/*
** updates a record based on display_name, email or id
** requires at least one of {name, surname, display_name, password}
*/
router.put('/users/:login', async function (req, res, next) {
	let result = await Users.update.Single(req.params.login,req.body);
	res.send(result);
});

/*
** logs in the user based on display_name, email or id
**	requires {password}
*/
router.post('/login/:login', async function(req, res, next){
	let results = await Users.validate.Password(req.params.login,req.body.password);
	console.log("success",results);
	if(results.user){
		results.user.password = null;
		req.session.user = results.user;
		req.session.isLoggedIn = true;
	}
	res.send(results);
});
/*
** returns the current user logged in
*/
router.get('/login',async (req,res,next)=>{
	if(req.session.isLoggedIn) {
		res.send(req.session.user);
	}else {
		res.send(false);
	}
})

// router.post('/test/',async function(req,res,body){
// 	console.log("test");
// 	let result = await Users.insertUser(client,req.body);
// 	res.send(result);
// 	// Users.generateInsertRecordData(req.body);
// });
router.get('/profiles/', async function (req, res, next) {
	console.log("profiles get");
	
	let results = await Profiles.get.All();
	res.send(results);
});
router.get('/profiles/:login', async function (req, res, next) {
	console.log("profile get single");
	
	let results = await Profiles.get.Single(req.params.login);
	res.send(results);
});
router.put('/profiles/:login', async function (req, res, next) {
	console.log("profile update");
	
	let results = await Profiles.update.Single(req.params.login,req.body);
	res.send(results);
});
router.post('/profiles/:login', async function (req, res, next) {
	console.log("profile insert");
	
	let results = await Profiles.insert.Single(req.params.login,req.body);
	res.send(results);
});

// router.get('/mail/:address',async function(req,res,next){
// 	console.log("sending mail to :",req.params.address);
// 	let message = {
// 		to:req.params.address,
// 		subject:"Matcha Email",
// 		text:"a mail for you"
// 	}
// 	let results = await sendMail(message);
// 	res.send(results);
// })

router.get('/', (req, res) => {
	res.send('server running');
})

module.exports = router;