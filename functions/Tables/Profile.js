const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { Users } = require('./User');
const getFullUserProfile = async(login) => {
	console.log("login =>", login);
	let user = await Users.get.Single(login);
	if (!user)
		return {error:"no such user"}
	console.log("user", user);
	let query = `SELECT
		USERS.id,
		USERS.display_name,
		USERS.name,
		USERS.surname,
		IMAGES.type,
		IMAGES.data,
		PROFILES.gender,
		PROFILES.date_of_birth,
		PROFILES.fame,
		PROFILES.biography,
		PROFILES.location,
		PROFILES.sexual_preference,
		PROFILES.age,
		PROFILES.gender
	FROM USERS
	INNER JOIN IMAGES ON USERS.id = IMAGES.userId
	INNER JOIN (
		SELECT *, 
		EXTRACT(YEAR from AGE(date_of_birth)) as "age"
		FROM PROFILES
	) as PROFILES ON USERS.id = PROFILES.userId
	WHERE USERS.id = ${user.id};`;
	let result = await client
		.query(query)
		.then((result) => {
			// return BufferB64.All.B64(result.rows);
			console.log(result.rows)
			return result.rows;
		})
		.catch((error) => {
			console.log(error);
			if (error.detail) return { error: error.detail };
			return { error: error };
		});
	return result;
}
const getProfileFromLogin = async (login) => {
	let user = await Users.get.Single(login)
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
			return result.rows[0] ;
		})
		.catch(error => {
			console.log(error);
			if (error.detail)
				return ({ error: error.detail });
			return ({ error: error });
		});
	return result;
};

const getAllProfilesData = async () => {
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

const insertProfile = async (login, data) => {
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
	const query = InsertRecord("Profiles", { ...values, ...{ userId: user.id } }, null);
	if (query.errors) {
		res.send({ "query error": query.errors });
		throw query.errors;
	}
	let results = await client.query(query.string, query.values)
		.then(async result => {
			let results = await Profiles.get.Single(login);
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

const updateProfile = async (login, data) => {
	const values = validateData(data);
	let user = await Profiles.get.Single(login)
	.then(async (user) => {
		let query = await UpdateRecord("Profiles", values, { id: user.id });
		let results = await client.query(query.string, query.values)
			.then(async result => {
				let results = await Profiles.get.Single(login);
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
	if (data.gender)
		valid.gender = data.gender;
	if (data.sexual_preference)
		valid.sexual_preference = data.sexual_preference;
	if (data.biography)
		valid.biography = data.biography;
	if (data.location)
		valid.location = data.location;
	if (data.date_of_birth)
		valid.date_of_birth = data.date_of_birth;
	if (data.fame)
		valid.fame = data.fame;
	if (data.userId)
		valid.userId = data.userId;
	return valid;
}






let Profiles = {
	get : {
		Single: getProfileFromLogin,
		Entire:getFullUserProfile,
		All: getAllProfilesData
	},
	validate : {
		// Password:validatePassword
	},
	insert : {
		Single: insertProfile
	},
	update :{
	// name:{},
	// surname:{},
	// display_name:{},
	// password:{},
		Single: updateProfile
	}
}

module.exports = { Profiles }