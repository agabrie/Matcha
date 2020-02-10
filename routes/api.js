const express = require('express');
const router = express.Router();
const User =  require('../models/users');
const Image =  require('../models/images');
const Profile = require('../models/profiles');
const Validata= require('../functions/user').validate;
var fs = require('fs');
const bcrypt = require('bcrypt');

//get a list of  all the users from the db
router.get('/users', function(req, res, next){
	User.find({}).then(function(users){
		res.send(users);
	});
});

router.get('/users/query/', (req, res, next)=>{
	console.log(req.body);
	User.find({'profile':req.body}).then((data)=>{
		res.send(data);
	})
});
//loging a user in
router.post('/login', function(req, res, next){
	User.findOne({
		email: req.body.email
	}).then(function(user){
		if(!user){
			res.send({error:true, message: "User does not exist!"});
		}
		if(!user.comparePassword(req.body.password, user.password)){
			res.send({error:true, message: "Wrong password!"});
		}
		req.session.user = user;
		req.session.isLoggedIn = true;
		res.send({message: "You are signed in"});
		res.send(user);
	}).catch(function(error){
		console.log(error)
	});
});

//cheking if a user is logged in
router.get('/login', function(req, res, next){
	if(req.session.isLoggedIn) {
		res.send(true);
	}else {
		res.send(false);
	}
});

//get a specific user
router.get('/users/search', (req, res, next)=>{
	// console.log('ni');
	User.find({
		'profile':{
			$exists:true
		}
	},
	(err,obj)=>{
		return obj;
	})
	.then((data)=>{
		if(!data)
			throw new Error;
		res.send(data);
	})
	.catch(err=>{res.send(err)});
});

// var find_sexual_preference=(sexual_preference)=>{
// 	var sp;
// 	switch(sexual_preference){
// 		case 'Male':
// 			sp=['Male'];
// 			break;
// 		case 'Female':
// 			sp=['Female'];
// 			break;
// 		case 'Both':
// 			sp=['Male','Female'];
// 			break;
// 	}
// 	return sp;
// };

router.get('/users/search/:query', (req, res, next)=>{
	console.log(req.params);
	console.log(req.query);
	// console.log(Validata);
	if(req.params.query=="search")
	{
		var sexual_preference = Validata.profile.find_sexual_preference(req.query.sexual_preference);
			// console.log(sexual_preference);
	User.find({
		$and:[
			{
				'profile':{
					$exists:true
				}
			},
			{
				$or:[
					{
						'profile.gender':sexual_preference[0]
					},
					{
						'profile.gender':sexual_preference[1]
					}
				]
			}
		]
	},
	(err,obj)=>{
		return obj;
	})
	.then((data)=>{
		if(!data)
			throw new Error;
		res.send(data);
	})
	.catch(err=>{res.send(err)});
	}else{
		var sexual_preference = Validata.profile.find_sexual_preference(req.query.sexual_preference);
	User.find({
		$and:[
			{
				'profile':{
					$exists:true
				}
			},
			{
				$or:[
					{$or:[
						{
							'profile.gender':sexual_preference[0]
						},
						{
							'profile.gender':sexual_preference[1]
						}
					]},
					{
						'email':req.query.email
					}
				]
			}
		]
	},
	(err,obj)=>{
		return obj;
	})
	.then((data)=>{
		if(!data)
			throw new Error;
		res.send(data);
	})
	.catch(err=>{res.send(err)});
}
});

router.get('/users/:login_name', function(req, res, next){
	User.findOne({'display_name': req.params.login_name}, function(err, obj){return obj})
	.then(function(user){
		if(!user)
			throw new Error;
        res.send(user);
	}).catch(function(){
		User.findOne({'email': req.params.login_name}, function(err, obj){return obj})
		.then(function(user){
			if(!user)
				throw new Error;
        	res.send(user);
		})
		.catch(function(err){res.send({err: 'no user found'})});
	});
});

//update user profile
router.post('/users/uploadImage/:display_name',async function(req, res, next){
	try{
		if(!req.files) {
			console.log("no file")
			res.send({
				status: false,
				message: 'No file uploaded'
			});
		}else{
			var newImage = req.files.file;
			var imgPath = `./uploads/${req.params.display_name}-${newImage.name}.png`
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
			console.log(req.params.display_name);
			user = new User;
			await User.findOne({display_name:req.params.display_name})
			.then(async (data)=>{
				await newImage.mv(imgPath)
				// .catch(()=>{
				// 	res.send({
				// 		status:false,
				// 		message:"file could not be saved",
				// 		err
				// 	});
				// });
				user = data;
				var img = new Image;
				img.image.rank = newImage.name;
				img.image.data = await fs.readFileSync(imgPath)
				// .catch((err)=>{
				// 	res.send({
				// 		status:false, 
				// 		message:"file not found",
				// 		err
				// 	});
				// });
				user.profile.images[img.image.rank] = img;
				await user.validate()
				.then(async()=>{
					await user.save()
					.then((data)=>{
						console.log("success => ",data);
						res.send({
							status:true,
							message:"image uploaded to db successfully",
							data
						});
					}).catch((err)=>{
						console.log("err => ",err);
						res.send({
							status:false,
							message:"unsuccessful image upload to db",
							err
						});
					})
				});
			}).catch((err)=>{
				console.log("no such user=>",err);
				res.send({
					status:false,
					message:"user does not exist in database",
					err	
				});
			}
			)
		}
	}catch (err) {
        res.status(500).send(err);
    }
})

router.put('/users/:display_name',async function(req, res, next){
	user = new User;
	await User.findOne({display_name : req.params.display_name})
	.then(async (data)=>{
		user = data
		// console.log(data);
		var userData = new Profile;
		if(user.profile)
			userData = user.profile;
		user.profile = Validata.profile.updateProfile(userData, req.body.profile);
		await user.save().then((data)=>{
			console.log(data);
			res.send({message:"success",data:data})
		}).catch(err=>res.send(err));
	})
	.catch(err=>{res.send(err)});
});

//creating a user profile
router.post('/users', function(req, res, next){
	var user = new User(req.body);
	user.password = user.hashPassword(user.password);
    user.save().then(function(user){
        res.send(user);
    }).catch(function(err){res.send(err)});
});


module.exports = router;