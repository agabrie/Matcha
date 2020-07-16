const { BufferB64 } = require('./BufferB64');
const SingleResponse = (data) => {
	console.log("data before format => ", data);
	let user = {};
	let auth = {};
	let profile = {};
	let views = [];
	let images = [];
	data.forEach((element) => {
		user = formatUser(element);
		auth = formatAuth(element);
		profile = formatProfile(element);

		let image = formatImage(element);
		if (image) images.push(image);
		let view = formatViews(element);
		if (view) views.push(view);
	});
	images = removeDups(images);;
	views = removeDups(views);
	user.auth = auth;
	user.profile = profile;
	user.images = images;
	user.views = views;
	console.log("data after format =>", user);
	user.images = BufferB64.All.B64(user.images);
	return user;
};
const MultipleResponse = (data) => {
	console.log("data before format => ", data);
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
		user.auth = auth;
		user.profile = profile;
		user.images = images;
		user.views = views;
		// user.images = BufferB64.All.B64(user.images);
		
		users.push(user)
	});
	console.log("data after format =>", users);
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
const formatViews = (data) => {
	let valid = {};
	if (data.userId) valid.userId = data.userId;
	if (data.viewed) valid.viewed = data.viewed;
	if (data.liked) valid.liked = data.liked;
	if (data.userId) valid.userId = data.userId;
	if (data.likedback) valid.likedback = data.likedback;
	return valid;
};
const formatUser = (data) => {
	let valid = {};
	if (data.id) valid.id = data.id;
	if (data.name) valid.name = data.name;
	if (data.surname) valid.surname = data.surname;
	if (data.email) valid.email = data.email;
	if (data.display_name) valid.display_name = data.display_name;
	return valid;
};
const formatImage = (data) => {
	let image = {};
	if (data.type) image.type = data.type;
	if (data.data) image.data = data.data;
	if (data.rank) image.rank = data.rank;
	return image;
};
const formatProfile = (data) => {
	let valid = {};
	if (data.gender) valid.gender = data.gender;
	if (data.age) valid.age = data.age;
	if (data.age_diff) valid.age_diff = data.age_diff;
	if (data.sexual_preference) valid.sexual_preference = data.sexual_preference;
	if (data.biography) valid.biography = data.biography;
	if (data.location) valid.location = data.location;
	if (data.date_of_birth) valid.date_of_birth = data.date_of_birth;
	if (data.fame) valid.fame = data.fame;
	return valid;
};
const formatAuth = (data) => {
	let valid = {};
	if (data.verified) valid.verified = data.verified;
	if (data.notifications) valid.notifications = data.notifications;
	if (data.loggedin) valid.loggedin = data.loggedin;
	if (data.token) valid.token = data.token;
	return valid;
};
const formatResponse = {
	User: {
		Single: SingleResponse,
		Multiple: MultipleResponse
	},
};
module.exports = { formatResponse };
