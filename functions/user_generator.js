const axios = require( "axios");
const {names,surnames,genders,sexual_preferences} =require("./generator.json")

getItem = (arr)=>{
	var item = arr[getRandom(arr.length)]; 
	return item;
}

getName=(gender)=>{
	let name = getItem(names[gender])
	return name;
}
generateEmail=(name,surname,display_name)=>{
	let seperators = ['.','','_']
	let domains = ['gmail.com','student.wethinkcode.co.za','wethinkcode.co.za']
	let format = getRandom(2);
	let email = ''
	switch (format) {
		case 0:
			email = `${name+getItem(seperators)+surname}@${getItem(domains)}`;
			break;
		case 1:
			email = `${display_name}@${getItem(domains)}`;
			break;
		default:
			break;
	}
	return email;
}
generateDisplayName=(name,surname)=>{
	let format = getRandom(4)
	let namelength = 3+getRandom(name.length-3)
	let snamelength = 3+getRandom(surname.length-3)
	let display_name;
	switch (format) {
		case 0:
			display_name = `${name.substring(0,2)}_${surname}`
			break;
		case 1:
			display_name = `${name.substring(0,1)}${surname}`
			break;
		case 2:
			if(namelength+snamelength > 12){
				while(namelength >1 && (namelength+snamelength) > 12)
				{
					namelength--;
				}
			}
			display_name= `${name.substring(0,namelength)}${surname.substring(0,snamelength)}`;
			break;
		default:
			if(namelength+snamelength > 12){
				while(snamelength >1 && (namelength+snamelength) > 12)
				{
					snamelength--;
				}
			}
			display_name= `${name.substring(0,namelength)}${surname.substring(0,snamelength)}`;
			break;
	}
	return display_name;
}
getGender=(num)=>{
	var item = genders[num]; 
	return item;
}

getRandom=(num)=>{
	return Math.floor(Math.random() * num);
}

generateAge = ()=>{
	let age = 18 + getRandom(50)
	let today_year = new Date().getFullYear();
	let date_of_birth = new Date(today_year-age,getRandom(12)+1,getRandom(31)+1,getRandom(24),getRandom(60),getRandom(60),getRandom(1000));
	return date_of_birth;
}
postUsers=async (users)=>{
	var responses=[];
	users.forEach(async (user) => {
		responses.push(new Promise((resolve, reject) => {
			axios.post('http://localhost:4000/api/Users',user)
			.then(res => {
				if(res.data.errors)
				{
					reject(res.data.errors)		
				}
				else
				{
					resolve({userdata:res.data, success:true})
				}
			});			
		}))
	})
	return await Promise.all(responses);
}
const generateUsers = async (num)=>{
	var users = []
	console.log("generating users...");
	for(var i = 0;i<num;i++){
		let user={};
		let gender = getRandom(2);
		user.name=getName(gender);
		user.surname=getItem(surnames);
		user.display_name = generateDisplayName(user.name,user.surname);
		user.email = generateEmail(user.name,user.surname,user.display_name);
		user.password = `${user.display_name}@123`;
		user.profile = {
			gender: getGender(gender),
			sexual_preference: getItem(sexual_preferences),
			date_of_birth: generateAge()
		}
		user.profile.biography = `I like ${user.profile.sexual_preference}s`
		users.push(user)
	}
	return await postUsers(users);
}

module.exports = {generateUsers}