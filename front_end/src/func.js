import axios from 'axios';

const  login = async (user) => {
	let result = await axios.post('http://localhost:8001/api/login', user).then(res => {
		if(res.data.error) {
			return {error: res.data.error}
		}
		return res
	});
	console.log(result.data)
	if (!result.error){
		sessionStorage.setItem("id", result.data.id);
		sessionStorage.setItem("display_name", result.data.display_name)
	}
	return result;
};
const hasImage = async (user) => {
	console.log("check images");
	let hasImage = sessionStorage.getItem("ppVerified");
	console.log("has image? => ", hasImage);

	if (!hasImage) {
		let res = await axios.get(`http://localhost:8001/api/images/${user}`)
		console.log(res.data)
		if (res.data && res.data.images.length) {
			sessionStorage.setItem("ppVerified",true)
			return true;
		}
		return false;
	}
	else
		return true;
}
const hasProfile = async (user) => {
	console.log("check profile")
	let hasProfile = sessionStorage.getItem("profileVerified");
	console.log("has profile? => ",hasProfile)
	if (hasProfile) {
		return true;
	} else {
		console.log("here")
		let res = await axios.get(`http://localhost:8001/api/profiles/${user}`);
		console.log("profile checkings ->",res.data);
		if (res.data && !isEmpty(res.data.profile)) {
			sessionStorage.setItem("profileVerified", true);
			return true;
		}
		return false;
	}
};
const checkVerified = async () => {
	let user = sessionStorage.getItem("display_name")
	let profile = await hasProfile(user)
	console.log(profile);
	if (profile) {
		let image = await hasImage(user)
		if (image) {
			return true;
		}
		else
			return "/imageUpload";
	}else{
		return "/Profile"
	}
	
	return null;
}
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
const register = async(user)=>{
	let result = await axios.post('http://localhost:8001/api/Users',user)
	.then(res => {
		if(res.data.error){
			return {error: res.data.error};
		}
		return res.data;
	});
	console.log(result)
	return result;
}
const deleteImage = async (state) => {
	var { display_name, rank } = state;
	let img = { rank: rank };
	let url = `http://localhost:8001/api/images/${display_name}`;
	let result = await axios.delete(url, { data: img });
	return result;
};
const uploadImage = async (state) => {
	var { data, display_name, rank, type } = state;
	let img = { data: data, rank: rank, type: type };
	let url = `http://localhost:8001/api/images/${display_name}`;
	let result = await axios.post(url, img);
	return result;
};
const getAllUserImages = async (display_name) => {
	console.log(display_name)
	let results = await axios
		.get(`http://localhost:8001/api/images/${display_name}`)
		.then((res) => {
			if (res.data.error) {
				return { error: res.data.error };
			}
			console.log(res);
			return isEmpty(res.data)?[]:res.data.images;
		});
	console.log(results);
	return results;
};

const sendToken = async (user)=> {
	let result = await axios.post('http://localhost:8001/api/verify', user).then(res => {
		if(res.data.error){
			return {error: res.data.error};
		}
		return res ;
	})
	return result.error ? false : true;
}

export {login, sendToken, register,getAllUserImages,deleteImage,uploadImage,checkVerified};
export default {login, sendToken, register,getAllUserImages,deleteImage,uploadImage,checkVerified}