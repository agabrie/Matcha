const ProfileData = function(data){
	profile = {
		gender				: data.gender,
		sexual_preference	: data.sexual_preference,
		biography			: data.biography,
		images				: data.images, 
		interests			: data.interests,
		views				: data.views,
		location			: data.location,
		date_of_birth		: data.date_of_birth
	}
}
const UserData = function(data){
    user = {
        display_name: data.username,
        name		: data.name,
		surname		: data.surname,
		email		: data.email,
		password	: data.password,
		profile		: data.profile
    }
}
const find_sexual_preference = function(sexual_preference){
	var sp;
	switch(sexual_preference){
		case 'Male':
			sp=['Male'];
			break;
		case 'Female':
			sp=['Female'];
			break;
		case 'Both':
			sp=['Male','Female'];
			break;
	}
	console.log(sp)
	return sp;
};
const updateProfile = (profile,data)=>{
	profile.location=			data.location			? data.location				:profile.location;
	profile.sexual_preference=	data.sexual_preference	? data.sexual_preference	:profile.sexual_preference;
	profile.biography=			data.biography			? data.biography			:profile.biography;
	profile.gender=				data.gender				? data.gender				:profile.gender;
	profile.images=				data.images				? data.images				:profile.images;
	profile.interests=			data.interests			? data.interests			:profile.interests;
	profile.views=				data.views				? data.views				:profile.views;
	profile.date_of_birth=		data.date_of_birth		? data.date_of_birth		:profile.date_of_birth;
	return profile;
}
module.exports = {
	validate : {
		user : UserData,
		profile : {
			ProfileData,
			find_sexual_preference,
			updateProfile
		}
	}
}