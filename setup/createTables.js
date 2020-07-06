const {client} = require('../dbConnection');

const createUsersTable = async () => {
	// const query = createTable(User);
	const query =
	`CREATE TABLE IF NOT EXISTS
	Users
	(
			id SERIAL NOT NULL PRIMARY KEY,
			name VARCHAR(20) NOT NULL DEFAULT 'JOHN',
			surname VARCHAR(20) NOT NULL DEFAULT 'DOE',
			email VARCHAR(40) NOT NULL DEFAULT 'JOHNDOE@GMAIL.COM' UNIQUE,
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
        gender INTEGER NOT NULL DEFAULT '0',
        sexual_preference INTEGER NOT NULL DEFAULT '2',
        biography VARCHAR(150) NOT NULL DEFAULT 'I AM A HUMAN',
        location POINT NOT NULL DEFAULT '(0,0)',
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

const createAllTables = async () =>{
	let output = {};
	// try{
		output.users = await create.Users();
		output.profiles = await create.Profiles();
		output.views = await create.Views();
		output.images = await create.Images();
		output.interests = await create.Interests();
		return output;
	// }
	// catch{

	// }
};
const create= {
	Users:createUsersTable,
	Profiles:createProfilesTable,
	Images:createImagesTable,
	Interests:createInterestsTable,
	Views:createViewsTable,
	All:createAllTables
}
module.exports = {create};