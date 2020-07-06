const {client} = require('../dbConnection');

const clearUsersTable = async()=>{
	const query = "DELETE FROM USERS;"
	let result = await client.query(query)
		.then(result => {
			return { result: "users table cleared successfully" };
		})
		.catch(err => {
			return { error: err };
		});
	return result;
};
const clearProfilesTable = async()=>{
	const query = "DELETE FROM PROFILES;"
	let result = await client.query(query)
		.then(result => {
			return { result: "profiles table cleared successfully" };
		})
		.catch(err => {
			return { error: err };
		});
	return result;
};
const clearImagesTable = async()=>{
	const query = "DELETE FROM IMAGES;"
	let result = await client.query(query)
		.then(result => {
			return { result: "images table cleared successfully" };
		})
		.catch(err => {
			return { error: err };
		});
	return result;
};
const clearViewsTable = async()=>{
	const query = "DELETE FROM VIEWS;"
	let result = await client.query(query)
		.then(result => {
			return { result: "views table cleared successfully" };
		})
		.catch(err => {
			return { error: err };
		});
	return result;
};
const clearInterestsTable = async()=>{
	const query = "DELETE FROM INTERESTS;"
	let result = await client.query(query)
		.then(result => {
			return { result: "interests table cleared successfully" };
		})
		.catch(err => {
			return { error: err };
		});
	return result;
};
const clearAllTables = async () =>{
	let output = {};
	// try{
		output.interests = await clear.Interests();
		output.views = await clear.Views();
		output.images = await clear.Images();
		output.profiles = await clear.Profiles();
		output.users = await clear.Users();
		return output;
	// }
	// catch{

	// }
};
const clear = {
	Users:clearUsersTable,
	Profiles:clearProfilesTable,
	Images:clearImagesTable,
	Views:clearViewsTable,
	Interests:clearInterestsTable,
	All:clearAllTables
}

module.exports = {clear};