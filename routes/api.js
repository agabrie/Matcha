const express = require('express');
const router = express.Router();
const User =  require('../models/users');
const bcrypt = require('bcrypt');

//get a list of  all the users from the db
router.get('/users', function(req, res, next){
	User.find({}).then(function(users){
		res.send(users);
	});
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
			res.send({error:true, message:"Wrong password!"});
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
router.get('/users/:login_name', function(req, res, next){
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

//update user profile
router.put('/users/:id', function(req, res, next){
    res.send({type: 'PUT'});
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