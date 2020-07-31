import axios from "axios";
const port = 8002;
const host = "localhost";
// const host = "192.168.8.101";
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

const hasImage = async (user) => {
	// console.log("check images");
	let hasImage = sessionStorage.getItem("ppVerified");
	// console.log("has image? => ", hasImage);

	if (!hasImage) {
		let res = await axios.get(`${api}/images/${user}`);
		console.log(res.data);
		if (res.data && res.data.images.length) {
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
		return "/Profile";
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

const sendToken = async (user)=> {
	let result = await axios.post(`${api}/verify`, user).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res;
	});
	return result.error ? false : true;
};

const forgotPassword = async (user) => {
	let result = await axios.get(`${api}/forgotpass`, user).then((res) => {
		if (res.data.error) {
			return { error: res.data.error };
		}
		return res.data;
	});
	return result.error ? false : true;
};

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
	console.log("locateUser!");
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
	console.log(result);
	return result;
};
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
	getProfileData
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
	getProfileData
};

