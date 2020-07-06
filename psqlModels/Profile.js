// function User (name, surname, email, display_name, password, profileId) {
	const validateData =(data)=>{
		/*
			gender
			sexual_preference
			biography
			// galleryId
			// interestsId
			// viewsId
			location
			date_of_birth
		*/
		try{
			// if(!(data.name && data.surname && data.email && data.display_name && data.password))
				// throw "some user fields incorrectly filled in or missing!";
			let validData = {};
			// let validData = {
				// name:data.name,
				// surname:data.surname,
				// email:data.email,
				// display_name:data.display_name,
				// password:data.password
			// }
			if(data.gender)
				validData.gender = data.gender;
			if(data.sexual_preference){
				switch(data.sexual_preference)
				{
					case "Male":validData.sexual_preference = 0;break;
					case "Female":validData.sexual_preference = 1;break;
					case "Both":validData.sexual_preference = 2;break;
				}
				// validData.sexual_preference = data.sexual_preference;
			}
			// if(data.biography)
				validData.biography = data.biography ? data.biography : null;
			// else
			// if(data.location)
				validData.location = data.location ? data.location:null;
				validData.date_of_birth = data.date_of_birth ? data.date_of_birth:null;
			// if(data.userId)
				validData.userId = data.userId;
			console.log("v",validData);
			return validData;
		}
		catch(err){
			console.log(err);
			return ({error:err});
		}
		// console.log("validated : ",validData);
		// return validData;
	}

const Profile = {
	tableName:"Profiles",
	fields:
	{
		id :
		{
			type : "SERIAL",
			required : true,
			keyType:"PRIMARY"
			// value:id
		},
		gender:
		{
			type:"INTEGER",
			// length:20,
			required:true,
			default:"18",
			// value:name
		},
		sexual_preference:
		{
			type:"INTEGER",
			// length:20,
			required:true,
			default:"2",
			// value:surname
		},
		biography:
		{
			type:"VARCHAR",
			length:150,
			required:true,
			default:"I AM A HUMAN",
			// unique:true,
			// value:email
		},
		// galleryId:
		// {
		// 	type:"INTEGER",
		// 	// length:12,
		// 	required:true,
		// 	default:"0",
		// 	// unique:true,
		// 	// value:display_name
		// },
		// interestsId:
		// {
		// 	type:"VARCHAR",
		// 	length:20,
		// 	required:true,
		// 	default:"#none",
		// 	// value:password
		// },
		// viewsId:{
		// 	type:"INTEGER",
		// 	// length:12,
		// 	required:true,
		// 	default:"0",
		// },
		location:{
			type:"POINT",
			required:true,
			default:"(0,0)"
		},
		date_of_birth:{
			type:"DATE",
			// length:12,
			required:true,
			default:"CURRENT_TIMESTAMP",
		},
		userId:{
			type:"INT",
			keyType:"FOREIGN",
			reference:{
				table:"Users",
				field:"id"
			}
		}
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

module.exports = Profile;