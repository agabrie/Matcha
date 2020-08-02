const { BufferB64 } = require('./BufferB64');
const SingleResponse = (data) => {
	if (data.error)
		return ({error:data.error})
	if (!Array.isArray(data))
	// 	return data;
	data = [data]
	// console.log("data before format => ", data);
	let user = {};
	let auth = {};
	let profile = {};
	let views = [];
	let images = [];
	data.forEach((element) => {

		user = formatUser(element);
		console.log(user)
		auth = formatAuth(element);
		profile = formatProfile(element);

		let image = formatImage(element);
		if (image) images.push(image);
		let view = formatViews(element);
		if (view) views.push(view);
	});
	images = removeDups(images);;
	views = removeDups(views);
	if (!isEmpty(auth)) user.auth = auth;
	if (!isEmpty(profile)) user.profile = profile;
	if (!isEmpty(images)) user.images = images;
	if (!isEmpty(views)) user.views = views;
	// console.log("data after format =>", user);
	if (user.images) user.images = BufferB64.All.B64(user.images);
	return user;
};
const MultipleResponse = (data) => {
	// console.log("data before format => ", data);
	let users = [];
	// let auth = {};
	// let profile = {};
	data.forEach((element) => {
		let views = [];
		let images = [];
		let user = formatUser(element);
		let auth = formatAuth(element);
		let profile = formatProfile(element);
		let image = formatImage(element);
		if (image) images.push(image);
		let view = formatViews(element);
		if (view) views.push(view);
		images = removeDups(images);
		views = removeDups(views);
		if(!isEmpty(auth)) user.auth = auth;
		if (!isEmpty(profile)) user.profile = profile;
		if (!isEmpty(images)) user.images = images;
		if (!isEmpty(views)) user.views = views;
		// console.log("num images -> ", user.images.length)
		// console.log(user.images)
		if(user.images)
			user.images = BufferB64.All.B64(user.images);
		
		users.push(user)
	});
	users = removeDups(users);
	// console.log("data after format =>", users);
	return users;
};
const removeDups = (arr) => {
	const uniqueArray = arr.filter(
		(object, index) =>
			index ===
			arr.findIndex(
				(obj) => JSON.stringify(obj) === JSON.stringify(object)
			)
	);
	return uniqueArray;
};
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
const formatViews = (data) => {
	let valid = {};
	if (data.userId != null) valid.userId = data.userId;
	if (data.viewed != null) valid.viewed = data.viewed;
	if (data.liked != null) valid.liked = data.liked;
	if (data.userId != null) valid.userId = data.userId;
	if (data.likedback != null) valid.likedback = data.likedback;
	if (isEmpty(valid)) return null;
	return valid;
};
const formatUser = (data) => {
	let valid = {};
	if (data.id != null) valid.id = data.id;
	if (data.name != null) valid.name = data.name;
	if (data.surname != null) valid.surname = data.surname;
	if (data.email != null) valid.email = data.email;
	if (data.display_name != null) valid.display_name = data.display_name;
	if (isEmpty(valid)) return null;
	return valid;
};
const formatImage = (data) => {
	let valid = {};
	if (data.type != null) valid.type = data.type;
	if (data.data != null) valid.data = data.data;
	if (data.rank != null) valid.rank = data.rank;
	if (isEmpty(valid)) return null;
	return valid;
};
const formatProfile = (data) => {
	let valid = {};
	if (data.gender != null) valid.gender = data.gender;
	if (data.age != null) valid.age = data.age;
	if (data.age_diff != null) valid.age_diff = data.age_diff;
	if (data.sexual_preference != null)
		valid.sexual_preference = data.sexual_preference;
	if (data.biography != null) valid.biography = data.biography;
	if (data.location != null) valid.location = data.location;
	if (data.date_of_birth != null) valid.date_of_birth = data.date_of_birth;
	if (data.fame != null) valid.fame = data.fame;
	if (isEmpty(valid)) return null;
	return valid;
};
const formatAuth = (data) => {
	let valid = {};
	if (data.verified != null) valid.verified = data.verified;
	if (data.notifications != null) valid.notifications = data.notifications;
	if (data.loggedin != null) valid.loggedin = data.loggedin;
	if (data.token != null) valid.token = data.token;
	if (isEmpty(valid)) return null;
	return valid;
};
const formatResponse = {
	User: {
		Single: SingleResponse,
		Multiple: MultipleResponse
	},
};
module.exports = { formatResponse };
