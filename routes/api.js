const express = require('express');
const router = express.Router();
const User =  require('../models/users');

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

var find_sexual_preference=(sexual_preference)=>{
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

router.get('/users/search/:query', (req, res, next)=>{
	console.log(req.params);
	console.log(req.query);
	if(req.params.query=="search")
	{
		var sexual_preference = find_sexual_preference(req.query.sexual_preference);
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
		var sexual_preference = find_sexual_preference(req.query.sexual_preference);
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
router.put('/users/:display_name',function(req, res, next){
	User.findOneAndUpdate({display_name : req.params.display_name},req.body)
	.then((user)=>{
		console.log(user);
		User.findOne({_id:user._id})
		.then((user)=>{
			console.log(user);
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