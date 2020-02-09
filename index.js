const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');

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
app.use(express.static('uploads'));
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));
app.use(
    cors({
        origin: ["http://localhost:3000","http://localhost:3001","http://localhost:8000"],
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

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err._message})
});

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests on port: '+(process.env.port||4000));
});