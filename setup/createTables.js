const { client } = require('../dbConnection');
const createAuthTable = async () => {
	// const query = createTable(User);
	const query =
		`CREATE TABLE IF NOT EXISTS
	Auth
	(
		id SERIAL NOT NULL PRIMARY KEY,
		verified BOOLEAN NOT NULL DEFAULT 'FALSE',
		notifications BOOLEAN NOT NULL DEFAULT 'TRUE',
		token VARCHAR (100) NOT NULL,
		loggedIn BOOLEAN NOT NULL DEFAULT 'FALSE',
		userId INT REFERENCES Users(id) UNIQUE
	);`;
	// console.log(User);
	let result = await client.query(query)
		.then(result => {
			return { result: "authentication table created successfully" };
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
const createUsersTable = async () => {
	// const query = createTable(User);
	const query =
		`CREATE TABLE IF NOT EXISTS
	Users
	(
			id SERIAL NOT NULL PRIMARY KEY,
			name VARCHAR(20) NOT NULL DEFAULT 'JOHN',
			surname VARCHAR(20) NOT NULL DEFAULT 'DOE',
			email VARCHAR(50) NOT NULL DEFAULT 'JOHNDOE@GMAIL.COM' UNIQUE,
			display_name VARCHAR(12) NOT NULL DEFAULT 'JDOE' UNIQUE,
			password VARCHAR(100) NOT NULL DEFAULT 'ASDasd123'
	);`;
	// console.log(User);
	let result = await client.query(query)
		.then(result => {
			return { result: "users table created successfully" };
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

const createProfilesTable = async () => {
	// const query = createTable(Profile);
	const query =
		`CREATE TABLE IF NOT EXISTS
	Profiles
	(
        id SERIAL NOT NULL PRIMARY KEY,
        gender VARCHAR(7) NOT NULL DEFAULT 'FEMALE',
        sexual_preference VARCHAR(7) NOT NULL DEFAULT 'MALE',
        biography VARCHAR(150) NOT NULL DEFAULT 'I AM A HUMAN',
		location POINT NOT NULL DEFAULT '(0,0)',
		fame INT NOT NULL DEFAULT '100',
        date_of_birth DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        userId INT REFERENCES Users(id) UNIQUE
	);`;
	// console.log(User);
	let result = await client.query(query)
		.then(result => {
			return { result: "profiles table created successfully" };
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

const createImagesTable = async () => {
	// const query = createTable(Profile);
	const query =
		`CREATE TABLE IF NOT EXISTS
	Images
	(
		id SERIAL NOT NULL PRIMARY KEY,
		data BYTEA NOT NULL,
		type VARCHAR (30) NOT NULL DEFAULT 'data:image/png;base64,',
		rank INT NOT NULL DEFAULT '0',
		userId INT REFERENCES Users(id),
		profileId INT REFERENCES Profiles(id)
	);`;
	// console.log(User);
	let result = await client.query(query)
		.then(result => {
			return { result: "images table created successfully" };
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

const createViewsTable = async () => {
	// const query = createTable(Profile);
	const query =
		`CREATE TABLE IF NOT EXISTS
	Views
	(
		id SERIAL NOT NULL PRIMARY KEY,
		userId INT REFERENCES Users(id),
		viewed INT references users(id),
		liked BOOLEAN NOT NULL DEFAULT 'FALSE',
        likedback BOOLEAN NOT NULL DEFAULT 'FALSE'
	);`;
	// console.log(User);
	let result = await client.query(query)
		.then(result => {
			return { result: "views table created successfully" };
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

const createInterestsTable = async () => {
	// const query = createTable(Profile);
	const query =
		`CREATE TABLE IF NOT EXISTS
	Interests
	(
		id SERIAL NOT NULL PRIMARY KEY,
		tag VARCHAR (12) NOT NULL DEFAULT 'PEOPLE',
		userId INT REFERENCES Users(id),
        profileId INT REFERENCES Profiles(id)
	);`;
	// console.log(User);
	let result = await client.query(query)
		.then(result => {
			return { result: "views table created successfully" };
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

const createAllTables = async () => {
	let output = {};
	// try{
	output.users = await create.Users();
	output.profiles = await create.Profiles();
	output.auth = await create.Auth();
	output.interests = await create.Interests();
	output.images = await create.Images();
	output.views = await create.Views();
	return output;
	// }
	// catch{

	// }
};

const create = {
	Users: createUsersTable,
	Profiles: createProfilesTable,
	Images: createImagesTable,
	Interests: createInterestsTable,
	Views: createViewsTable,
	Auth: createAuthTable,
	All: createAllTables
}

module.exports = { create };