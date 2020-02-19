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
	return sp;
};

module.exports = {
	validate : {
		user : UserData,
		profile : {
			ProfileData,
			find_sexual_preference
		}
	}
}