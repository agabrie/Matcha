const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');
const { Password } = require('../Password');
const { sendMail } = require('../sendMail');
require('dotenv').config();
const getImagesFromLogin = async (login) => {
	let user = await Users.get.Single(login)
		.then((res) => {
			return res.result
		})
	const query =
		`SELECT
		Users.display_name,
		Users.email,
		Images.*
	FROM Users
	INNER JOIN Images ON Users.id = Images.userId 
	WHERE Images.userId = ${user.id};
	`;
	let result = await client.query(query)
		.then(result => {
			return { result: convertimagestobase64(result.rows) };
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

const getAllImagesData = async () => {
	const query =
		`SELECT
		Users.display_name,
		Users.email,
		Images.*
	FROM Users
	INNER JOIN Images ON Users.id = Images.userId
	`;
	let result = await client.query(query)
		.then(result => {
			return { result: convertimagestobase64(result.rows) };
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
const deleteRankImageFromLogin = async (login,rank,user)=>{
	if(!user){
		user = await Users.get.Single(login)
		.then((res) => {
			return res.result
		})
	}
	const query = `DELETE FROM IMAGES WHERE Images.userId = ${user.id} AND Images.rank =${rank}`
	let result = await client.query(query)
		.then(result => {
			return { result: convertimagestobase64(result.rows) };
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
const insertImages=async (login,data)=>{
	// console.log("add image")
	// let buf = Buffer.from(file.image,'binary')
	// console.log(login,file);
	// let image = null;
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
	const values= validateData(data);
	deleteRankImageFromLogin(login,data.rank,user);
	console.log(values);
	let query = InsertRecord("Images", { ...values, ...{ userId: user.id } }, null);
	console.log("query => ",query)
	// let query = `INSERT into IMAGES (data,rank,userId) values ('${file.image}','${file.rank}','${user.id}') RETURNING *;`
	let results = await client.query(query.string,query.values)
		.then(result => {
			console.log("success",result.rows)
			return {result: convertimagestobase64(result.rows)};
		})
		.catch(err => {
			console.log({ "sql error": err });
			return ({ error: err.detail });
		});
	return (results);
	// return image;
}
const B64ImgToBuffer = (base64)=>{
	let binary = new Buffer(base64,'base64')
	return binary
}

const BufferToB64Img=(buffer) =>{
	let res = Buffer.from(buffer, 'binary').toString('base64')
	return res;
}

const validateData = (data) => {
	// console.log("data => ",data);
	let valid = {}
	if (data.data)
		valid.data = B64ImgToBuffer(data.data);
	if (data.rank)
		valid.rank = data.rank;
	if (data.type)
		valid.type = data.type;
	if (data.id)
		valid.userId = data.id;
	console.log("valid => ",valid);
	return valid;
}

const convertimagestobase64=(images)=>{
	images.forEach((image)=>{
		console.log(image.data)
		image.data = BufferToB64Img(image.data)
	})
	return images;
}

let get = {
	Single: getImagesFromLogin,
	All: getAllImagesData
}

let validate = {
	// Password:validatePassword
}

let insert = {
	Single: insertImages
}

let update = {
	// name:{},
	// surname:{},
	// display_name:{},
	// password:{},
	// Single: updateImages
}
let Images = {
	get,
	validate,
	insert,
	update
}

module.exports = { Images }