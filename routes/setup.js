const express = require('express');
const router = express.Router();
const {Setup} = require('../setup/functions');
const {client} = require('../dbConnection');
const {generateUsers} = require('../functions/user_generator');


router.get('/generate/:counter',(req,res,next)=>{
	console.log("generate users");
	let counter = req.params.counter;
	if(counter <= 0)
		counter = 5;
	let data = generateUsers(counter).then((newdata)=>{
		res.send({message:'done',data:newdata});
	})
})
router.get('/generate/',(req,res,next)=>{
	console.log("generate users");
	let counter = 50;
	let data = generateUsers(counter).then((newdata)=>{
		res.send({message:'done',data:newdata});
	})
})

router.get('/users/clear', async (req, res, next) => {
	console.log("clear users");
	let data = await Setup.clear.Users();
	console.log(data);
	res.send(data)
})

router.get('/users', async (req, res, next) => {
	console.log("setup users");
	let data = await Setup.create.Users();
	console.log(data);
	res.send(data);
});

router.get('/profiles', async (req, res, next) => {
	console.log("setup profiles");
	let data = await Setup.create.Profiles();
	console.log(data);
	res.send(data);
});

router.get('/all', async (req, res, next) => {
	console.log("setup all tables");
	let data = await Setup.create.All();
	console.log(data);
	res.send(data);
});

router.get('/all/drop', async (req, res, next) => {
	console.log("drop all tables");
	let data = await Setup.drop.All();
	console.log("drop",data);
	res.send({"dropped:":data});
});

router.get('/all/clear', async (req, res, next) => {
	console.log("clear all tables");
	let data = await Setup.clear.All();
	console.log("drop",data);
	res.send({"cleared:":data});
});

module.exports = router;