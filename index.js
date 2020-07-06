const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const {client} = require('./dbConnection');
client.connect();

const app = express();


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
        credentials: true
    })
);

app.use(
    session({
        secret: "ThisIsSecret",
        saveUninitialized: true,
        resave: true,
        cookie: {maxAge: 60000 * 30}
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use('/setup', require('./routes/setup'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err._message})
});

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests on port: '+(process.env.port||4000));
});