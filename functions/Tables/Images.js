const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');
const { Password } = require('../Password');
const { sendMail } = require('../sendMail');
const { BufferB64 } = require("../BufferB64");
const { Buffer } = require('safe-buffer');

require('dotenv').config();
const getImagesFromLogin = async (login) => {
	let user = await Users.get.Single(login)

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
			return  BufferB64.All.B64(result.rows) ;
		})
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
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
		return BufferB64.All.B64(result.rows);
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	return result;
}
const deleteRankImageFromLogin = async (login,rank,user)=>{
	if(!user){
		user = await Users.get.Single(login)
	}
	const query = `DELETE FROM IMAGES WHERE Images.userId = ${user.id} AND Images.rank =${rank}`
	let result = await client.query(query)
		.then(result => {
			return BufferB64.All.B64(result.rows);
		})
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
		});
	return result;
}
const insertImages=async (login,data)=>{
	let user = await Users.get.Single(login)
	.then((res) => {
		if (res.id)
			return res
		else
			throw { error: "no id" }
	})
	.catch((err) => { return { error: err }; })

	if (user.error)
		return { error: user.error };
	const values = validateData(data);
	console.log("vals => ",values)
	deleteRankImageFromLogin(login, data.rank, user);
	let query = InsertRecord("Images", { ...values, ...{ userId: user.id } }, null);
	console.log(query);
	let results = await client.query(query.string,query.values)
	.then(result => {
		return BufferB64.All.B64(result.rows);
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	return (results);
}


const validateData = (data) => {
	let valid = {}
	if (data.data)
		valid.data = BufferB64.Single.Buff(data.data);
	if (data.rank)
		valid.rank = data.rank;
	if (data.type)
		valid.type = data.type;
	if (data.id)
		valid.userId = data.id;
	return valid;
}



let Images = {
	get : {
		Single: getImagesFromLogin,
		All: getAllImagesData
	},	
	validate : {
		// Password:validatePassword
	},
	insert : {
		Single: insertImages
	},
	update : {
		// name:{},
		// surname:{},
		// display_name:{},
		// password:{},
		// Single: updateImages
	}
}

module.exports = { Images }