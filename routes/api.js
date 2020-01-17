const express = require('express');
const router = express.Router();
const User =  require('../models/users');

//get a list of  all the users from the db
router.get('/users', function(req, res, next){
	User.find({}).then(function(users){
		res.send(users);
	});
});

//get a specific user
router.get('/users/:login_name', function(req, res, next){
	// if(req.params.login_name === "search")
	// 	req.use('/users/search/all');
    User.findOne({'display_name': req.params.login_name}, function(err, obj){return obj}).then(function(user){
		if(!user)
			throw new Error;
        res.send(user);
	}).catch(function(){
		User.findOne({'email': req.params.login_name}, function(err, obj){return obj}).then(function(user){
			if(!user)
				throw new Error;
        	res.send(user);
		}).catch(function(err){res.send({err: 'no user found'})});
	});
});
router.get('/users/search/all', (req, res, next)=>{
	console.log('ni');
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
router.get('/users/search/:query', (req, res, next)=>{
	console.log(req.params);
	console.log(req.query);
	if(!req.params.query){
		console.log('non');
		req.use('/users/search/all');
	}
	else{
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
							'profile.gender':req.query.gender
						},
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
// router.put('/users/:id', function(req, res, next){
//     res.send({type: 'PUT'});
// });

//creating a user profile
router.post('/users', function(req, res, next){
    User.create(req.body).then(function(user){
        res.send(user);
    });
});

module.exports = router;