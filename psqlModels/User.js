// function User (name, surname, email, display_name, password, profileId) {
	const validateData =(data)=>{
		console.log(data);
		try{
			if(!(data.name && data.surname && data.email && data.display_name && data.password))
				throw "some user fields incorrectly filled in or missing!";
			let validData = {
				name:data.name,
				surname:data.surname,
				email:data.email,
				display_name:data.display_name,
				password:data.password
			}
			return validData;
		}
		catch(err){
			console.log(err);
			return ({error:err});
		}
		// console.log("validated : ",validData);
		// return validData;
	}

const User = {
	tableName:"Users",
	fields:
	{
		id :
		{
			type : "SERIAL",
			required : true,
			keyType:"PRIMARY"
			// value:id
		},
		name:
		{
			type:"VARCHAR",
			length:20,
			required:true,
			default:"JOHN",
			// value:name
		},
		surname:
		{
			type:"VARCHAR",
			length:20,
			required:true,
			default:"DOE",
			// value:surname
		},
		email:
		{
			type:"VARCHAR",
			length:40,
			required:true,
			default:"JOHNDOE@GMAIL.COM",
			unique:true,
			// value:email
		},
		display_name:
		{
			type:"VARCHAR",
			length:12,
			required:true,
			default:"JDOE",
			unique:true,
			// value:display_name
		},
		password:
		{
			type:"VARCHAR",
			length:20,
			required:true,
			default:"ASDasd123",
			// value:password
		},
		// profileId:{
		// 	type:"INT",
		// 	keyType:"FOREIGN",
		// 	reference:{
		// 		table:"Profiles",
		// 		field:"id"
		// 	}
		// // 	// value:profileId
		// }
	},
	validateData
}

module.exports = User