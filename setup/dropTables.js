const {client} = require('../dbConnection');

const dropUsersTable = async()=>{
	const query = "DROP TABLE USERS;"
	let result = await client.query(query)
		.then(result => {
			return { result: "users table dropped successfully" };
		})
		.catch(err => {
			return { error: err };
		});
	return result;
};
const dropProfilesTable = async()=>{
	const query = "DROP TABLE PROFILES;"
	let result = await client.query(query)
		.then(result => {
			return { result: "profiles table dropped successfully" };

		})
		.catch(err => {
			return { error: err };
		});
	return result;
}
const dropImagesTable = async()=>{
	const query = "DROP TABLE IMAGES;"
	let result = await client.query(query)
		.then(result => {
			return { result: "images table dropped successfully" };

		})
		.catch(err => {
			return { error: err };
		});
	return result;
}
const dropViewsTable = async()=>{
	const query = "DROP TABLE Views;"
	let result = await client.query(query)
		.then(result => {
			return { result: "views table dropped successfully" };

		})
		.catch(err => {
			return { error: err };
		});
	return result;
}
const dropInterestsTable = async()=>{
	const query = "DROP TABLE INTERESTS;"
	let result = await client.query(query)
		.then(result => {
			return { result: "interests table dropped successfully" };

		})
		.catch(err => {
			return { error: err };
		});
	return result;
}
const dropAllTables = async () =>{
	let output = {};
	// try{
		output.interests = await drop.Interests();
		output.views = await drop.Views();
		output.images = await drop.Images();
		output.profiles = await drop.Profiles();
		output.users = await drop.Users();

		return output;
	// }
	// catch{

	// }
};
const drop = {
	Users:dropUsersTable,
	Profiles:dropProfilesTable,
	Images:dropImagesTable,
	Views:dropViewsTable,
	Interests:dropInterestsTable,
	All:dropAllTables
}
module.exports = {drop};