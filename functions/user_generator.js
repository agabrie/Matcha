const axios = require("axios");
const {
	names,
	surnames,
	genders,
	sexual_preferences,
	verified,
	loggedin,
} = require("./generator.json");
require("dotenv").config();
const env = process.env;
// const { FileReader } = require("FileReader");
const fs = require("fs");
const dirname = "./uploads";
// const images = []
const getFileNames = async () => {
	// let names = null;
	// names = await fs.readdir(dirname, async (err, files) => {
	// 	if (err) {
	// 		return console.log("Unable to scan directory: " + err);
	// 	} else {
	// 		console.log("readdir : ",files);
	// 		return files;
	// 	}
	// })
	// .then((data) => { 
	// 	console.log("return value : ",names);
	// })
	// return names;
	return new Promise(function (resolve, reject) {
		fs.readdir(dirname, (err, data) => {
			if (err)
				reject(err)
			else { 
				console.log("data",data);
				resolve(data);
			}
		});
	});
};
const getImage = async (fileName) => { 
	return new Promise(function (resolve, reject) {
			fs.readFile(`${dirname}/${fileName}`, (err, data) => {
				if (err)
					reject(err)
				else {
					// console.log()
					resolve(data.toString('base64'));
				}
			});
	});
}
const getImages = async () => {
	let imageNames = [];
	let images = [];
	imageNames = await getFileNames();
	imageNames.forEach(async (fileName) => {
		let image = await getImage(fileName);
		images.push(image);
		console.log("images here -> ",images)
		// resolve(images.push(image));
	});
	// return new Promise(function (resolve, reject) {
	return Promise.all(images);
	// });
	// console.log("list imgs", imageNames);
	// console.log("list imgs", images);
	// return images;
};
// console.log(images)
getItem = (arr) => {
	var item = arr[getRandom(arr.length)];
	return item;
};

getName = (gender) => {
	let name = getItem(names[gender]);
	return name;
};
generateEmail = (name, surname, display_name) => {
	let seperators = [".", "", "_"];
	let domains = ["gmail.com", "student.wethinkcode.co.za", "wethinkcode.co.za"];
	let format = getRandom(2);
	let email = "";
	switch (format) {
		case 0:
			email = `${name + getItem(seperators) + surname}@${getItem(domains)}`;
			break;
		case 1:
			email = `${display_name}@${getItem(domains)}`;
			break;
		default:
			break;
	}
	return email;
};
generateDisplayName = (name, surname) => {
	let format = getRandom(4);
	let namelength = 3 + getRandom(name.length - 3);
	let snamelength = 3 + getRandom(surname.length - 3);
	let display_name;
	switch (format) {
		case 0:
			display_name = `${name.substring(0, 2)}_${surname}`;
			break;
		case 1:
			display_name = `${name.substring(0, 1)}${surname}`;
			break;
		case 2:
			if (namelength + snamelength > 12) {
				while (namelength > 1 && namelength + snamelength > 12) {
					namelength--;
				}
			}
			display_name = `${name.substring(0, namelength)}${surname.substring(
				0,
				snamelength
			)}`;
			break;
		default:
			if (namelength + snamelength > 12) {
				while (snamelength > 1 && namelength + snamelength > 12) {
					snamelength--;
				}
			}
			display_name = `${name.substring(0, namelength)}${surname.substring(
				0,
				snamelength
			)}`;
			break;
	}
	return display_name;
};
getGender = (num) => {
	var item = genders[num];
	return item;
};

getRandom = (num) => {
	return Math.floor(Math.random() * num);
};

generateAge = () => {
	let age = 18 + getRandom(50);
	let today_year = new Date().getFullYear();
	let date_of_birth = new Date(
		today_year - age,
		getRandom(12) + 1,
		getRandom(31) + 1,
		getRandom(24),
		getRandom(60),
		getRandom(60),
		getRandom(1000)
	);
	return date_of_birth;
};
postUsers = async (users) => {
	var responses = [];
	for (element in users) {
		let user = users[element];
		// console.log(element);
		let url = `${env.url}/api/Users`;
		// console.log(url);
		let userResult = await axios
			.post(url, user)
			.then((result) => {
				// console.log(result.data);
				if (!result.data || result.data.error) {
					throw { error: result.data.error };
				} else return { userdata: result.data, success: true };
			})
			.catch((err) => {
				return { error: err };
			});
		if (userResult.userdata) {
			responses.push(userResult.userdata);
			user.success = true;
			console.log(user.display_name);
		} else {
			user.success = false;
		}
	}
	return { responses, users };
};
postProfiles = async (users) => {
	var responses = [];
	for (element in users) {
		let user = users[element];
		// console.log(element);
		let url = `${env.url}/api/profiles/${user.display_name}`;
		let userResult = await axios
			.post(url, user.profile)

			.then((result) => {
				// console.log(result.data);
				if (!result.data || result.data.error) {
					throw { error: result.data.error };
				} else return { userdata: result.data, success: true };
			})
			.catch((err) => {
				return { error: err };
			});
		if (userResult.userdata) {
			responses.push(userResult.userdata);
			user.success = true;
			console.log(user.display_name);
		} else {
			user.success = false;
		}
	}
	return { responses, users };
};
postAuths = async (users) => {
	var responses = [];
	for (element in users) {
		let user = users[element];
		console.log(element);
		let url = `${env.url}/api/auth/${user.display_name}`;
		let userResult = await axios
			.put(url, user.auth)

			.then((result) => {
				// console.log(result.data);
				if (!result.data || result.data.error) {
					throw { error: result.data.error };
				} else return { userdata: result.data, success: true };
			})
			.catch((err) => {
				return { "error here in auth": err };
			});
		if (userResult.userdata) {
			responses.push(userResult.userdata);
			user.success = true;
			console.log(user.display_name);
		} else {
			user.success = false;
		}
	}
	return { responses, users };
};
postImages = async (users) => {
	var responses = [];
	for (element in users) {
		let user = users[element];
		console.log(element);
		// let image = user.image;
		// let b64 = Buffer.from(user.image, "binary").toString("base64");
		// let imageData = user.image.split(",");
		let image = { rank: 1, data: user.image, type: "data:image/png;base64" };
		// console.log("image to upload -> ", image)
		// console.log("b64 to upload -> ", imageData);
		let url = `${env.url}/api/images/${user.display_name}`;
		let userResult = await axios
			.post(url, image)

			.then((result) => {
				// console.log(result.data);
				if (!result.data || result.data.error) {
					throw { error: result.data.error };
				} else return { userdata: result.data, success: true };
			})
			.catch((err) => {
				return { "error here in auth": err };
			});
		if (userResult.userdata) {
			responses.push(userResult.userdata);
			user.success = true;
			console.log(user.display_name);
		} else {
			user.success = false;
		}
	}
	return { responses, users };
};
const generateUsers = async (num) => {
	var images = [];
	var users = [];
	images = await getFileNames();
	console.log("images => ", images);
	console.log("######### generating users #########");
	for (var i = 0; i < num; i++) {
		let user = {};
		let gender = getRandom(2);
		user.name = getName(gender);
		user.surname = getItem(surnames);
		user.display_name = generateDisplayName(user.name, user.surname);
		user.email = generateEmail(user.name, user.surname, user.display_name);
		user.password = `${user.display_name}@123`;
		user.profile = {
			gender: getGender(gender),
			sexual_preference: getItem(sexual_preferences),
			date_of_birth: generateAge(),
			fame: getRandom(80) + 101,
		};
		user.profile.biography = `I like ${user.profile.sexual_preference}s`;
		user.auth = {
			verified: getItem(verified),
			loggedin: getItem(loggedin),
		};
		user.image = await getImage(getItem(images));
		user.nomail = true;
		users.push(user);
		console.log(user.display_name);
		console.log(user);
	}
	let postedUsers = null;
	let postedProfiles = null;
	let postedAuths = null;
	let postedImages = null;
	// console.log("######### generating users #########");
	// console.log(users);
	console.log("######### posting users #########");
	postedUsers = await postUsers(users);
	console.log("######### posting profiles #########");
	postedProfiles = await postProfiles(postedUsers.users);
	console.log("######### posting auths #########");
	postedAuths = await postAuths(postedUsers.users);
	console.log("######### posting images #########");
	postedImages = await postImages(postedUsers.users);
	result = {
		users: postedUsers.responses,
		profiles: postedProfiles.responses,
		auths: postedAuths.responses,
		images:postedImages.responses
	};
	// console.log(result);
	return result;
};

module.exports = { generateUsers };
