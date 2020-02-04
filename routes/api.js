const express = require('express');
const router = express.Router();
const User =  require('../models/users');
const Image =  require('../models/images');
const Validata= require('../functions/user').validate;
var fs = require('fs');

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
router.put('/users/updateImage/:display_name',async function(req, res, next){
	var userData = await User.findOne({display_name:req.params.display_name}).catch(next);
	// var newData = new User
	// console.log(userData);
	// newData = userData
		// var imagesArr = []
		// for(var image in userData.images){
		// 	imagesArr.push(userData.profile.images[image]);
		// }
	// imagesData = req.body.images
	// console.log("images => ",req.body.images)
	for(var image in req.body.images){
		var img = new Image
		// console.log([image])
		img.image.rank = req.body.images[image].rank;
		img.image.contentType = 'image/jpeg';
		img.image.data = fs.readFileSync(req.body.images[image].path)
		// console.log(img);
		userData.profile.images.push(img);
		// imagesArr.push(img);
		// newData.images.push(img);
		// userData.images.push(img);
	}
	// userData.profile.images=imagesArr;
	// console.log(userData.profile.images
	userData.save().then(async ()=>{
		await User.findOne({_id:userData._id}).then((data)=>{
			console.log(data);
			res.send(data);
		});
	});
	
	// console.log(imagesArr);
	// newData.display_name = "Nayayayyayayayayyayayayyaya"
	// newData.images = imagesArr;
	// console.log({"new Data":newData},"\n",{"userData":userData});
	// userData = await userData.save()
	// console.log(userData)
	// await userData.validate((err)=>{
	// 	if(err)
	// 		console.log(err)
	// 	else
	// 		res.send("success")
	// });
	// userData.save().then(async()=>{
	// 	await User.findOne({_id:userData._id}).then(()=>{
	// 		console.log(userData)
	// 	})
	// })
	// console.log(userData)
	// await userData.validate().then(data=>console.log(data));

	// await userData.save().then(()=>{
	// 	res.send(userData);
	// 	console.log(userData);
	// })
	// console.log(userData.images);
	// userData.images = 
})

router.put('/users/:display_name',function(req, res, next){
	userData = req.body;
	// images = userData.profile.images;
	// imagesArr = []
	// for (var image of images){
	// 	// console.log(image)
	// 	var img = new Image
	// 	img.image.data = fs.readFileSync(image.image.path)
	// 	img.image.contentType = 'image/jpeg';
	// 	img.save()
	// 	// console.log(img)
	// 	// console.log(image.image.path);

	// 	// new_img.img.data = fs.readFileSync(req.file.path)
    // // new_img.img.contentType = 'image/jpeg';
	// 	/*
	// 	data = fs.readFileSync(image.image.path);
	// 	image.image.data = data
	// 	*/
	// 	img.image.rank = 0
	// 	imagesArr.push(img)
	// 	// console.log(image);
	// }
	// userData.images=imagesArr;
	// // console.log(userData.images)
	userDatareths = userData
	// console.log(userDatareths.images[0])
	User.findOneAndUpdate({display_name : req.params.display_name},userDatareths)
	.then((user)=>{
		// console.log(user);
		User.findOne({_id:user._id})
		.then((user)=>{
			// console.log(user);
			res.send({
				type:"PUT",
				user:user
			});
		});	
	})
	.catch(next);
});

//creating a user profile
router.post('/users', function(req, res, next){
    User.create(req.body).then(function(user){
        res.send(user);
    });
});

module.exports = router;