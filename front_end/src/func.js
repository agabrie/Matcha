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

const forgotPassword = async (user) =>{
	let result = await axios.get('http://localhost:8001/api/forgotpass', user).then(res => {
		if(res.data.error){
			return {error: res.data.error};
		}
		return res.data ;
	})
	return result.error ? false : true;
}

const resetPassword = async (pass) => {
	console.log(pass);
	if (pass.password === pass.passwordcon){
		let password = {password: pass.password}
		let result = await axios.post(`http://localhost:8001/api/resetpass/${pass.display_name.display_name}`, password).then(res => {
			if(res.data.error){
				return {error: res.data.error};
			}
			return res.data ;
		})
		return result.error ? false : true;
	}
	else 
		return {error: "passwords don't match"};
}

const locateUser = async () => {
	let result = await axios.get(`http://localhost:8001/api/location`).then(res => {
		if(res.data.error){
			return {error: res.data.error};
		}
		return res.data ;
	})
	return result.error ? false : true;
}

const	uploadProfile = async (user) => {
	let result = await axios.post(`http://localhost:8001/api/profiles/${user.display_name}`, user)
	.then(res => {
		if(res.data.error){
			return {error: res.data.error};
		}
		return res.data;
	});
	console.log(result)
	return result;
} 

export {login, sendToken, register,getAllUserImages, forgotPassword, resetPassword, locateUser, deleteImage, uploadImage, uploadProfile};
export default {login, sendToken, register,getAllUserImages, forgotPassword, resetPassword, locateUser, deleteImage, uploadImage, uploadProfile}
