const express = require('express');
const router = express.Router();
const User =  require('../models/users');
const Image =  require('../models/images');
const Profile = require('../models/profiles');
const Interest = require('../models/interests');
const Validata= require('../functions/user').validate;
const {generateUsers} = require('../functions/user_generator');
var fs = require('fs');
const bcrypt = require('bcrypt');
const YEAR_IN_MS = 365.25*24*60*60*1000
//get a list of  all the users from the db
router.get('/users', function(req, res, next){
	User.find({}).then(function(users){
		res.send(users);
	});
});

/********************* agabrie ***********************/
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
		res.send({user:user,message: "You are signed in"});
		// res.send(user);
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
router.get('/users/profiles', (req, res, next)=>{
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

/********************* agabrie ***********************/
router.get('/generate',(req,res,next)=>{
	let data = generateUsers(50).then((newdata)=>{
		res.send({message:'done',data:newdata});
	})
})

/********************* agabrie ***********************/
router.post('/users/search',(req,res,next)=>{
	// console.log(req.body);
	filter = req.body
	let sexual_preference = filter.sexual_preference
	let age_range = {current:18,min:18,max:68}
	let gender = filter.gender
	let sortparams = filter.sort;
	if(filter.age)
		age_range = filter.age
	let age = {
		current : new Date(Date.now() - (age_range.current *  YEAR_IN_MS)),
		min : new Date(Date.now() - (age_range.min *  YEAR_IN_MS)),
		max : new Date(Date.now() - (age_range.max *  YEAR_IN_MS))
	}
	User.aggregate([
		{
			$project:{
				'_id':1,
				'name':1,
				"name": 1,
				"surname": 1,
				"display_name": 1,
				"profile.sexual_preference": 1,
				"profile.gender": 1,
				"profile.interests":1,
				"profile.date_of_birth": 1,
				"profile.biography": 1,
				"profile.interests":1,
				"generated.number_of_preferences": { $size: "$profile.sexual_preference" },
				"generated.age":{$floor : {$divide : [{$subtract:[new Date,"$profile.date_of_birth"]},YEAR_IN_MS]}},
				"generated.age_difference" : {$abs :{$ceil : {$divide : [{$subtract:["$profile.date_of_birth",age.current]},YEAR_IN_MS]}}},
				'profile.images': {
					$filter: {
						input: "$profile.images",
						as: "item",
						cond: { $eq: [ "$$item.rank", 0 ] }
					}
				}
			}
		},
		{
			$match:{
				$and:[
					{'profile.gender':{$in:sexual_preference}},
					{'profile.date_of_birth':{
						$gte:age.max,
						$lte:age.min
					}},
					{'profile.images.0':{$exists:true}},
					{'profile.sexual_preference':gender}
				]
			},
		},
		{
			$lookup: {
				from: Interest.collection.name,
				localField: "profile.interests",
				foreignField: "_id",
				as: "profile.interests"
			},
			$lookup: {
				from: Image.collection.name,
				localField: "profile.images._id",
				foreignField: "_id",
				as: "profile.images"
			},
		},
		{$sort:sortparams}
		
	]).then(data=>{
		res.send(data)
	})
})

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
router.get('/interests/',(req, res, next)=>{
	Interest.find({}).then((data)=>{
		if(!data)
			throw new Error;
		res.send(data);
	}).catch((err)=>{
		res.send({err:err,message:"no tags in db"});
	})
});
makeTag = async (interestData)=>{
	let tag = await Interest.findOne({'name':interestData.tag},(err, obj)=>{return obj})
	.then(async (interest)=>{
		if(!interest){
			let interest = new Interest;
			interest.name = req.body.tag;
			return await interest.save()
			.then((data)=>{
				console.log("success => ",data);
				return({
					status:true,
					message:"interest uploaded to db successfully",
					data
				});
				// return data;
			}).catch((err)=>{
				console.log("err => ",err);
				res.send({
					status:false,
					message:"unsuccessful interest upload to db",
					err
				});
			})
		}
		else
			return({
				status:true,
				message:"interest uploaded to db successfully",
				data:interest
			});
	})
	return tag;
}

router.post('/interests/addTag',async (req,res,next)=>{
	let interestData = req.body
	let tag = await makeTag(interestData);
	res.send(tag);
})

router.put('/users/addTag/:display_name',async (req,res,next)=>{
	let interestData = req.body
	let tag = await makeTag(interestData)
	// console.log(tag)
	let userTag = await User.findOne({'display_name':req.params.display_name},(err,obj)=>{return obj})
	.then(async (user)=>{
		if(!user)
			throw new Error;
		// console.log(user.profile.interests.includes(tag._id),tag,user.profile.interests)
		if(!user.profile.interests.includes(tag.data._id)){
			user.profile.interests.push(tag.data);
			return await user.save()
			.then((data)=>{
				return({
					status:true,
					message:"interest uploaded to user successfully",
					data:data.profile.interests
				});
			}).catch((err)=>{
				console.log("err => ",err);
				return({
					status:false,
					message:"unsuccessful interest upload to user",
					err
				});
			})
		}
		else
			return({
				status:true,
				message:"tag already linked to user",
				data:user.profile.interests
			});
		})
		.catch((err)=>{return({
			status:true,
			message:"no such user exists",
			err
		});
	})
	res.send({data:userTag});
});

addImage=async (file)=>{
	let img = new Image;

	let buf = Buffer.from(file.data,'binary')
	img.data = buf

	return await img.save()
			.then((data)=>{
				return({
					status:true,
					message:"image uploaded to user successfully",
					data
				});
			}).catch((err)=>{
				console.log("err => ",err);
				return({
					status:false,
					message:"unsuccessful image upload to user",
					err
				});
			})
	// console.log(img)
}
/********************* agabrie ***********************/
//update user profile
router.post('/users/uploadImage/:display_name',async function(req, res, next){
	console.log(req)
	try{
		// console.log("herere")
		if(!req.files) {
			console.log("no file")
			// res.send({
			// 	status: false,
			// 	message: 'No file uploaded'
			// });
		}
		else{
			var inputImage = req.files.file;
			let rank = req.body.rank; 
			// console.log(newImage)
			// var imgPath = `./uploads/pic.png`
			let image = await addImage(inputImage);
			// console.log(image,req.body);
			let user = 	await User.findOne({'display_name':req.params.display_name},(err,obj)=>{return obj})
			.then(async(user)=>{
				// console.log(user);
				if(!user.profile)
					user.profile = new Profile;
				let imageCount = user.profile.images.length;
				if(rank >= imageCount)
					user.profile.images.push({_id:image.data,rank:imageCount})
				if(user.profile.images.length > 0){
					user.profile.images.push({_id:user.profile.images[imageCount-1]._id,rank:imageCount})
					for(let i = rank+1;i < imageCount;i++)
						user.profile.images[i] = ({_id:user.profile.images[i-1]._id,rank:i})
					user.profile.images[rank] = ({_id:image.data,rank:rank})
				}else{
					user.profile.images[rank] = ({_id:image.data,rank:0})
				}
				console.log(user.profile.images);
				return await user.save()
				.then((data)=>{
					return({
						status:true,
						message:"image uploaded to user successfully",
						data
					});
				}).catch((err)=>{
					console.log("err => ",err);
					return({
						status:false,
						message:"unsuccessful image upload to user",
						err
					});
				})
			}).catch((err)=>{
				return({
					status:false,
					message:"user does not exist in db",
					err
				});
			})
			// console.log(user)
			res.send({user:"data"})
            
        //     //Use the mv() method to place the file in upload directory (i.e. "uploads")
		// 	console.log(req.params.display_name);
		// 	user = new User;
		// 	await User.findOne({display_name:req.params.display_name})
		// 	.then(async (data)=>{
		// 		await newImage.mv(imgPath)
		// 		// .catch(()=>{
		// 		// 	res.send({
		// 		// 		status:false,
		// 		// 		message:"file could not be saved",
		// 		// 		err
		// 		// 	});
		// 		// });
		// 		user = data;
		// 		var img = new Image;
		// 		// img.rank = newImage.name;
		// 		img.data = await fs.readFileSync(imgPath)
		// 		// .catch((err)=>{
		// 		// 	res.send({
		// 		// 		status:false, 
		// 		// 		message:"file not found",
		// 		// 		err
		// 		// 	});
		// 		// });
		// 		if(!user.profile)
		// 		 user.profile = new Profile
		// 		user.profile.images[newImage.rank] = {img,rank:newImage.rank};
		// 		await user.validate()
		// 		.then(async()=>{
		// 			await user.save()
		// 			.then((data)=>{
		// 				console.log("success => ",data);
		// 				res.send({
		// 					status:true,
		// 					message:"image uploaded to db successfully",
		// 					data
		// 				});
		// 			}).catch((err)=>{
		// 				console.log("err => ",err);
		// 				res.send({
		// 					status:false,
		// 					message:"unsuccessful image upload to db",
		// 					err
		// 				});
		// 			})
		// 		});
		// 	}).catch((err)=>{
		// 		console.log("no such user=>",err);
		// 		res.send({
		// 			status:false,
		// 			message:"user does not exist in database",
		// 			err	
		// 		});
		// 	}
		// 	)
		}
	}catch (err) {
        res.status(500).send(err);
    }
})

/********************* agabrie ***********************/
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