const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const { client } = require("./dbConnection");
client.connect();
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUserInRoom } = require('./ChatUsers');

// const {client} = require('./dbConnection');
// client.connect();

const app = express();
const server =  http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
	console.log("made connection", socket.id)
	socket.on('join', ({name, room}, callback) => {
		const { error, user } = addUser({id: socket.id, name, room});

		if(error) return callback(error);
		console.log(user)
		socket.emit('message', { user: 'admin', text: `Welcome ${user.name}`});
		socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});

		socket.join(user.room);

		io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom})
		
		callback();
	});

	socket.on('sendMessage', (message, callback) =>{
		const user = getUser(socket.id);
		io.to(user.room).emit('message', {user: user.name, text: message});
		io.to(user.room).emit('roomdata', {room: user.room, users: getUserInRoom});
	
		callback();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);
	})
});

// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
//         credentials: true
//     })
// );

app.use(
	cors({
		origin: [process.env.ClientURL, "http://192.168.8.100:3002"],
		methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
		credentials: true,
	})
);

// app.use(
// 	session({
// 		secret: "ThisIsSecret",
// 		saveUninitialized: true,
// 		resave: true,
// 		cookie: { maxAge: 60000 * 30 },
// 	})
// );

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(bodyParser.json({ limit: "12mb" }));

app.use("/api", require("./routes/api"));
app.use("/setup", require("./routes/setup"));

app.use(function (err, req, res, next) {
	res.status(422).send({ error: err._message });
});

app.listen(process.env.port || 4000, function () {
	// console.log(process.env)
	console.log(
		"now listening for requests on port: " + (process.env.port || 4000)
	);
});
server.listen( 4001, function(){
    console.log('now listening for requests on port: '+(process.env.port||4000));
});

	// app.listen(process.env.port || 4000, function(){
	//     console.log('now listening for requests on port: '+(process.env.port||4000));
	// });
