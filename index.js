const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const dbusername = "kheynes";
const dbpassword = "ASDasd123";
const url = `mongodb+srv://${dbusername}:${dbpassword}@users-fcrwt.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err._message})
});

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});