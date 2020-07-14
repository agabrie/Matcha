const { client } = require('../../dbConnection');
const { InsertRecord } = require('../InsertRecord');
const { UpdateRecord } = require('../UpdateRecord');
const { BufferB64 } = require('../BufferB64');

const { Password } = require('../Password');
const getAllVerifiedUsersSortedByAge = async() => {
	let query = 
	`SELECT
		USERS.id,
		USERS.display_name,
		IMAGES.type,
		IMAGES.data,
		PROFILES.gender,
		PROFILES.date_of_birth,
		PROFILES.fame,
		PROFILES.age,
		PROFILES.age_diff
	FROM USERS
	INNER JOIN AUTH ON USERS.id = AUTH.userId
	INNER JOIN IMAGES ON USERS.id = IMAGES.userId
	INNER JOIN (
		SELECT *, 
		EXTRACT(YEAR from AGE(date_of_birth)) as "age",
		ABS(EXTRACT(YEAR from AGE(date_of_birth)) - 30) as "age_diff" FROM PROFILES
	) as PROFILES ON USERS.id = PROFILES.userId
	WHERE AUTH.verified = 'TRUE' AND IMAGES.rank = '1'
	ORDER BY
		age_diff ASC,
		fame ASC,
		age ASC`
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
const getAllVerifiedUsers = async() => {
	let query = 
	`SELECT
		USERS.id,
		USERS.display_name,
		IMAGES.type,
		IMAGES.data,
		PROFILES.gender,
		PROFILES.date_of_birth,
		PROFILES.fame,
		PROFILES.age
	FROM USERS
	INNER JOIN AUTH ON USERS.id = AUTH.userId
	INNER JOIN IMAGES ON USERS.id = IMAGES.userId
	INNER JOIN (
		SELECT
			*, 
			EXTRACT(YEAR from AGE(date_of_birth)) as "age"
		FROM PROFILES
	) as PROFILES ON USERS.id = PROFILES.userId
	WHERE AUTH.verified = 'TRUE' AND IMAGES.rank = '1'`;
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
};
const getAllUsersData = async () => {
	const query = `SELECT * FROM USERS;`;
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

const getUserFromLogin = async (detail) => {
	let query = `SELECT * FROM USERS WHERE `;
	if (isNaN(detail))
		query += `display_name = '${detail}' OR email = '${detail}';`;
	else
		query += `id = '${detail}'`;
	console.log(query)
	let result = await client.query(query)
		.then(result => {
		console.log(result)
		return result.rows[0];
	})
		.catch(error => {
		console.log("gettin a user error =>",error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	// console.log(result);
	return result;
}

const insertUser = async (data) => {
	const values = validateData(data);
	const query = InsertRecord("Users", values, null);
	
	if (query.errors) {
		return({ error: query.errors });
	}

	let results = await client.query(query.string, query.values)
	.then(result => {
		return result.rows[0];
	})
	.catch(error => {
		console.log(error);
		if(error.detail)
			return ({ error: error.detail});
		return ({ error: error});
	});

	return results;
};

const updateUser = async (login, data) => {
	const values = validateUpdateData(data);
	let user = await Users.get.Single(login)
	.then(async (user) => {
		let query = await UpdateRecord("Users", values, { id: user.id });
		let results = await client.query(query.string, query.values)
		.then(result => {
			return result.rows[0];
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
	try {
		if (!(data.name && data.surname && data.email && data.display_name && data.password))
			throw "some user fields incorrectly filled in or missing!";
		let validData = {
			name: data.name,
			surname: data.surname,
			email: data.email,
			display_name: data.display_name,
			password: Password.encode_password(data.password)
		}
		return validData;
	}
	catch (err) {
		return ({ error: err });
	}
}

const validateUpdateData = (data) => {
	let validData = {}
	if (data.name)
		validData.name = data.name;
	if (data.surname)
		validData.surname = data.surname;
	if (data.display_name)
		validData.display_name = data.display_name;
	if (data.password)
		validData.password = Password.encode_password(data.password);
	return (validData);
}

const validatePassword = async (login, password) => {
	let result = await Users.get.Single(login)
	.then(async (user) => {
		let results = await Password.validate(password, user)
		if(results.error)
			throw "password is incorrect";
		else
			return results
	})
	.catch(error => {
		console.log(error);
		if (error.detail)
			return ({ error: error.detail });
		return ({ error: error });
	});
	return result;
};

let Users = {
	get : {
		Single: getUserFromLogin,
		Verified: {
			sorted: getAllVerifiedUsersSortedByAge,
			unsorted:getAllVerifiedUsers
		},
		All: getAllUsersData
	},
	validate : {
		Password: validatePassword
	},
	insert : {
		Single: insertUser
	},
	update : {
		// name: {},
		// surname: {},
		// display_name: {},
		// password: {},
		Single: updateUser
	}
}

module.exports = { Users }