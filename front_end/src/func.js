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

export {login, sendToken, register,getAllUserImages};
export default {login, sendToken, register,getAllUserImages}