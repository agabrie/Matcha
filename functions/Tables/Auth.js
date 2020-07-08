const {client} = require('../../dbConnection');
const {InsertRecord} = require('../InsertRecord');
const {UpdateRecord} = require('../UpdateRecord');
const {Users} = require('./User');
const {Password} = require('../Password');
const {sendMail} = require('../sendMail');
require('dotenv').config();



const getAuthFromLogin = async (login)=>{
	let user = await Users.get.Single(login)
	.then((res)=>{
		return res.result
	})
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
			return { result: result.rows[0]};
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

const getAllAuthData = async ()=>{
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
			return { result: result.rows};
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

const insertAuth = async(login,data)=>{
	// console.log("login and data => ",{login,data})
	let user = await Users.get.Single(login)
	.then((res)=>{
		if(res.result.id)
			return res.result
		else
			throw {error:"no id"}
	})
	.catch((err)=>{return {error:err};})
	// console.log("user in auth => ",user);
	if(user.error)
		return {error:user.error};
	const values = validateData(user);
	// console.log("values => ",values)
	const query = InsertRecord("Auth",{...values,...{userId:user.id}},null);
	// console.log(query);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(async result => {
			// console.log(result.rows)
			// return result.rows[0];
			let results = await Auth.get.Single(login);
			return results;
		})
		.catch(err => {
			console.log({ "sql error": err });
			return({error:err.detail});
		});
	await verifyEmail(login);
	return results;
};

const updateAuth = async(login,data)=>{
	const values = validateData(data);
	let user = await Auth.get.Single(login)
	.then((res)=>{
		return res.result
	})
	.then(async (user)=>{
		// console.log("update => ",user);
		let query = await UpdateRecord("Auth",values,{id:user.id});
		// console.log(query);
		let results = await client.query(query.string, query.values)
		.then(async result => {
			// console.log(result.rows)
			// return result.rows[0];
			let results = await Auth.get.Single(login);
			return results;
		})
		.catch(err => {
			console.log({ "sql error": err });
			return({error:err.detail});
		});
		return results;
	})
	return user;
}
const verifyEmail = async (loginDetails)=>{
	const frontend = {
		// host:process.env.ClientHost,
		// port:process.env.ClientPort
		host:process.env.host,
		port:process.env.port
	}
	// console.log(frontend);
	let user = await Auth.get.Single(loginDetails)
	.then((res)=>{
		return res.result
	})
	// console.log(user);
	let url = `http://${frontend.host}:${frontend.port}/api/verifyEmail/${user.email}/${encodeURIComponent(user.token)}`
	let message = {
		to:user.email,
		subject:"Matcha Verification",
		text:{
			header:`<h3>Hi ${user.display_name}!</h3>`, 
			body:`click <a href='${url}'>here</a> to verify your account or alternatively use the following link ${url}`,
			foot:``
		}
	}
	// console.log("message",message);
	let results = await sendMail(message);
	return results;
}

const validateData = (data)=>{
	// console.log("data => ",data);
	let valid = {}
	if(data.verified)
		valid.verified = data.verified;
	if(data.notifications)
		valid.notifications = data.notifications;
	// if(data.token)
		// valid.token = data.token;
	if(data.loggedin)
		valid.loggedin=data.loggedin;
	if(data.id)
		valid.userId = data.id;
	valid.token = Password.encode_password(data.display_name);
		// console.log("valid => ",valid);
	return valid;
}

let get = {
	Single:getAuthFromLogin,
	All:getAllAuthData
}

let validate = {
	// Password:validatePassword
}

let insert = {
	Single:insertAuth
}

let update = {
	// name:{},
	// surname:{},
	// display_name:{},
	// password:{},
	Single:updateAuth
}
let Auth = {
	get,
	validate,
	insert,
	update
}

module.exports = {Auth}