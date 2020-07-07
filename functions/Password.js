const bcrypt = require('bcrypt');

const encode_password = (password)=>{
	let hashPassword = bcrypt.hashSync(password, 12);
	console.log({hash:hashPassword,length:hashPassword.length});
	return hashPassword;
}

const compare_password = (password, hashPassword)=>{
    return bcrypt.compareSync(password, hashPassword);

}
const validate = (password,user)=>{
	console.log("user => ",user);
		if(!user){
			return({error:true, message: "User does not exist!"});
		}
		else if(!compare_password(password, user.password)){
			return({error:true, message: "Wrong password!"});
		}
		else{
			
			return ({message: "You are signed in",user});
		}
}
module.exports = {
	Password:{
		encode_password,
		compare_password,
		validate
	}
}