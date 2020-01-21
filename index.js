const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 4000

const app = express();
const dbusername = "kheynes";
const dbpassword = "ASDasd123";
const url = `mongodb+srv://${dbusername}:${dbpassword}@users-fcrwt.mongodb.net/test?retryWrites=true&w=majority`;

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

io.on('connection', (socket) => {
	console.log('New Connection!!');
	socket.on('disconnect', () => {
		console.log('Disconected');
	})
})

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err._message})
});

// app.listen(process.env.PORT || 4000, function(){
//     console.log('now listening for requests');
// });

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));