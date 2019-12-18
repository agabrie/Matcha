const express = require('express');
const router = express.Router();
const User =  require('../models/users');

//get a list of  all the users from the db
router.get('/users', function(req, res, next){
        console.log('get request')
        res.send({type: 'GET'});
});

module.exports = router;