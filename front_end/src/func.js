import axios from "axios";
const port = 8002;
const host = "localhost";
// const host = "192.168.8.100";
const api = `http://${host}:${port}/api`;

// const api = `http://192.168.8.101:${port}/api/`;
const login = async (user) => {
	console.log("login click!");
	let result = await axios
		.post(`${api}/login`, user)
		.then((res) => {
			console.log(res);
			if (res.data.error) {
				return { error: res.data.error };
			}
			return res;
		});
	console.log(result);
	if (!result.error) {
		sessionStorage.setItem("id", result.data.id);
		sessionStorage.setItem("display_name", result.data.display_name);
	}
	return result;
};
const isVerified = async (user) => {
	// console.log("check images");
	let isVerified = sessionStorage.getItem("vVerified");
	// console.log("has image? => ", hasImage);

	if (!isVerified) {
		let res = await axios.get(`${api}/images/${user}`);
		console.log(res.data);
		if (res.data && res.data.images && res.data.images.length) {
			sessionStorage.setItem("vVerified", true);
			return true;
		}
		return false;
	} else return true;
};
const hasImage = async (user) => {
	// console.log("check images");
	let hasImage = sessionStorage.getItem("ppVerified");
	// console.log("has image? => ", hasImage);

	if (!hasImage) {
		let res = await axios.get(`${api}/images/${user}`);
		console.log(res.data);
		if (res.data && res.data.images && res.data.images.length) {
			sessionStorage.setItem("ppVerified", true);
			return true;
		}
		return false;
	} else return true;
};
const hasProfile = async (user) => {
	// console.log("check profile");
	let hasProfile = sessionStorage.getItem("profileVerified");
	// console.log("has profile? => ", hasProfile);
	if (hasProfile) {
		return true;
	} else {
		console.log("here");
		let res = await axios.get(`${api}/profiles/${user}`);
		console.log("profile checkings ->", res.data);
		if (res.data && !isEmpty(res.data.profile)) {
			sessionStorage.setItem("profileVerified", true);
			return true;
		}
		return false;
	}
};
const checkVerified = async () => {
	let user = sessionStorage.getItem("display_name");
	let profile = await hasProfile(user);
	// console.log(profile);
	if (profile) {
		let image = await hasImage(user);
		if (image) {
			return null;
		} else return "/imageUpload";
	} else {
		return "/Edit";
	}

	// return null;
};
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
const register = async (user) => {
	let result = await axios.post(`${api}/Users`, user).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res.data;
	});
	console.log(result);
	return result;
};
const updateUser = async (user) => {
	let result = await axios.put(`${api}/Users/${sessionStorage.display_name}`, user).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res.data;
	});
	// console.log(result);
	return result;
};
const deleteImage = async (state) => {
	var { display_name, rank } = state;
	let img = { rank: rank };
	let url = `${api}/images/${display_name}`;
	let result = await axios.delete(url, { data: img });
	return result;
};
const uploadImage = async (state) => {
	var { data, display_name, rank, type } = state;
	let img = { data: data, rank: rank, type: type };
	let url = `${api}/images/${display_name}/`;
	let result = await axios.post(url, img);
	return result;
};
const getAllUserImages = async (display_name) => {
	// console.log(display_name);
	let results = await axios.get(`${api}/images/${display_name}`).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		// console.log(res);
		return isEmpty(res.data) ? [] : res.data.images;
	});
	// console.log(results);
	return results;
};

const addProfile = async(id, profile)=>{
	let result = await axios.put(`${api}/profiles/${id}`, profile).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res.data;
	});
	console.log(result)
	return result;
}

const sendToken = async (user) => {
	console.log(user);
	let result = await axios.post(`${api}/auth/verify`, user).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res;
	});
	return result.error ? false : true;
};

const forgotPassword = async (user) => {
	console.log("user->",user)
	let result = await axios.post(`${api}/forgotpass`, user).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res.data;
	});
	return result.error ? false : true;
};
const isStrongPassword=(password)=>{
	let passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
	if (password.match(passwordregex))
		return true;
	else
		return false;
}
const formatError = (error) => {
	return error.replace(/(Key|[=()])/g, " ");
}
const resetPassword = async (pass) => {
	console.log(pass);
	if (pass.password === pass.passwordcon) {
		let password = { password: pass.password };
		let result = await axios
			.post(`${api}/resetpass/${pass.display_name.display_name}`, password)
			.then((res) => {
				if (res.data.error) {
					return { error: res.data.error };
				}
				return res.data;
			});
		return result.error ? false : true;
	} else return { error: "passwords don't match" };
};
const getUserData = async () => {
	let data = await axios
		.get(`${api}/users/${sessionStorage.display_name}`)
		.then((res) => {
			return res.data;
		});
	if (data.error)
		return { error: data.error }
	else if (!data.id) {
		return { error: "no such user" }
	}
	else
		return data;
}
const getProfileData = async () => {
	checkVerified();
	// if(checkVerified())
	let data = await axios
		.get(`${api}/profiles/${sessionStorage.display_name}`)
		.then((res) => {
			return res.data;
		});
	if (data.error) return { error: data.error };
	else if (!data.id) {
		return { error: "no such user" };
	} else return data;
};
const locateUser = async () => {
	// console.log("locateUser!");
	let result = await axios.get(`${api}/location`).then((res) => {
		// console.log(res.data);
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res.data;
	});
	return result;
};

const uploadProfile = async (user) => {
	let result;
	if (!sessionStorage.ppVerified)
	result = await axios
		.post(`${api}/profiles/${sessionStorage.display_name}`, user)
		.then((res) => {
			if (res.data.error) {
				return { error: res.data.error };
			}
			return res.data;
		});
	else
		result = await axios
			.put(`${api}/profiles/${sessionStorage.display_name}`, user)
			.then((res) => {
				if (res.data.error) {
					return { error: res.data.error };
				}
				return res.data;
			});
	// console.log(result);
	return result;
};
const getFullLoggedProfile = async () => {
	let display_name = sessionStorage.display_name
	return await axios
		.get(`${api}/profiles/${display_name}/all`)
		.then((results) => {
			// let { users } = this.state;
			// console.log("users=>", users, index);
			// console.log("profile before => ", users[index]);
			// let user = users[index];
			// let profile = user.profile;
			// results.data.profile = { ...profile, ...results.data.profile };
			// user = { ...user, ...results.data };
			// user.profile.active = true;
			// users[index] = user;
			// console.log("profile after => ", users[index]);
			return results.data;
		});
};
const getFullProfile = async (users, display_name, index) => {
	// console.log("get full", { users, display_name, index });	
		return await axios
			.get(`${api}/profiles/${display_name}/all`)
			.then((results) => {
				// let { users } = this.state;
				// console.log("users=>", users, index);
				// console.log("profile before => ", users[index]);
				let i = getuserindex(users, index)
				// console.log(i)
				let user = users[i];
				let profile = user.profile;
				results.data.profile = { ...profile, ...results.data.profile };
				user = { ...user, ...results.data };
				user.profile.active = true;
				users[i] = user;
				// console.log("profile after => ", users[index]);
				return users;
			})
			
}
const getuserindex=(users, index)=>
{
	let i = 0;
	let res = i;
	while (i < users.length) {
		if (users[i].id === index)
			res = i;
		i++;
	}
	return res;
}
const getSearchResult = async (preferences) => {
	return await axios.post(`${api}/search/`, preferences).then((res) => { return res.data });
}
const getUnsortedSearchResults = async () => {
	return await axios.get(`${api}/search/unsorted`).then((res) => {
		return res.data;
	});;
};
const registerView = async (viewed) => {
	return await axios
			.post(`${api}/views/${sessionStorage.display_name}`, viewed)
}
const registerLike = async (liked) => {
	return await axios
			.put(`${api}/views/${sessionStorage.display_name}`, liked).then((res) => {
				return res.data;
			});
}
export {
	login,
	sendToken,
	register,
	getAllUserImages,
	forgotPassword,
	resetPassword,
	locateUser,
	deleteImage,
	uploadImage,
	uploadProfile,
	checkVerified,
	addProfile,
	getUserData,
	getProfileData,
	updateUser,
	isStrongPassword,
	formatError,
	getFullProfile,
	getSearchResult,
	registerView,
	isVerified,
	getUnsortedSearchResults,
	getFullLoggedProfile,
	registerLike,
};
export default {
	login,
	sendToken,
	register,
	getAllUserImages,
	forgotPassword,
	resetPassword,
	locateUser,
	deleteImage,
	uploadImage,
	uploadProfile,
	checkVerified,
	addProfile,
	getUserData,
	getProfileData,
	updateUser,
	isStrongPassword,
	formatError,
	getFullProfile,
	getSearchResult,
	registerView,
	isVerified,
	getUnsortedSearchResults,
	getFullLoggedProfile,
	registerLike,
};

