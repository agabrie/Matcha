import axios from 'axios';

const  login = async (user) => {
	let result = await axios.post('http://localhost:8001/api/login', user).then(res => {
		if(res.data.error) {
			return {error: res.data.error}
		}
		return res
	});
	console.log("this", result);
	if (result.error){
		return false
	}
	else {
		sessionStorage.setItem("id", result.data.user.id);
		sessionStorage.setItem("display_name", result.data.user.display_name)
		return true;
	}
};

export {login};
export default login