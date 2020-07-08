const {client} = require('../../dbConnection');
const {InsertRecord} = require('../InsertRecord');
const {UpdateRecord} = require('../UpdateRecord');
const {Users} = require('./User');

const getProfileFromLogin = async (login)=>{
	let user = await Users.get.Single(login)
	.then((res)=>{
		return res.result
	})
	const query =
	`SELECT
		Users.display_name,
		Users.email,
		Profiles.*
	FROM Users
	INNER JOIN Profiles ON Users.id = Profiles.userId 
	WHERE Profiles.userId = ${user.id};
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

const getAllProfilesData = async ()=>{
	const query = 
	`SELECT
		Users.display_name,
		Users.email,
		Profiles.*
	FROM Users
	INNER JOIN Profiles ON Users.id = Profiles.userId
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

const insertProfile = async(login,data)=>{
	let user = await Users.get.Single(login)
	.then((res)=>{
		if(res.result.id)
			return res.result
		else
			throw {error:"no id"}
	})
	.catch((err)=>{return {error:err};})
	if(user.error)
		return {error:user.error};
	const values = validateData(data);
	console.log("values => ",values)
	const query = InsertRecord("Profiles",{...values,...{userId:user.id}},null);
	console.log(query);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(async result => {
			console.log(result.rows)
			// return result.rows[0];
			let results = await Profiles.get.Single(login);
			return results;
		})
		.catch(err => {
			console.log({ "sql error": err });
			return({error:err.detail});
		});
	return results;
};

const updateProfile = async(login,data)=>{
	const values = validateData(data);
	let user = await Profile.get.Single(login)
	.then((res)=>{
		return res.result
	})
	.then(async (user)=>{
		// console.log("update => ",user);
		let query = await UpdateRecord("Profiles",values,{id:user.id});
		// console.log(query);
		let results = await client.query(query.string, query.values)
		.then(async result => {
			console.log(result.rows)
			// return result.rows[0];
			let results = await Profiles.get.Single(login);
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
const validateData = (data)=>{
	console.log(data);
	let valid = {}
	if(data.gender){
		/*
		if(data.gender == "Male")
			valid.gender = 1;
		else
			valid.gender = 2;
		*/
		valid.gender = data.gender;
	}
	if(data.sexual_preference){
		/*
		if(data.sexual_preference == "Both")
			valid.sexual_preference = 0;
		else if(data.sexual_preference == "Male"){
			valid.sexual_preference = 1;
		}
		else
			valid.sexual_preference = 2;
		*/
		valid.sexual_preference = data.sexual_preference;
	}
	if(data.biography)
		valid.biography = data.biography;
	if(data.location)
		valid.location=data.location;
	if(data.date_of_birth)
		valid.date_of_birth= data.date_of_birth;
	if(data.userId)
		valid.userId = data.userId;
	return valid;
}
let get = {
	Single:getProfileFromLogin,
	All:getAllProfilesData
}

let validate = {
	// Password:validatePassword
}

let insert = {
	Single:insertProfile
}

let update = {
	// name:{},
	// surname:{},
	// display_name:{},
	// password:{},
	Single:updateProfile
}
let Profiles = {
	get,
	validate,
	insert,
	update
}

module.exports = {Profiles}