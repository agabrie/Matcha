import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

import InfoBarChat from "../InfobarChat/InfobarChat";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";


let socket;


const Chat = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');	
	const [messages, setMessages] = useState([]);	
	const ENDPOINT = 'localhost:4001';

	useEffect(() => {
		const {name, room} = queryString.parse(window.location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);

		socket.emit('join', { name, room }, () => {

		});

		return () => {
			socket.emit('disconnect');
			socket.off();
		}
	}, [ENDPOINT]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message])
		})
	}, [messages]);

	const sendMessage = (event) => {
		event.preventDefault();
		if(message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	}

	console.log(message, messages);

    return(
        <div className="outerContainer">
			<div className="container">
				<InfoBarChat room={room}/>
				<Messages messages={messages} name={name}/>
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
	    </div> 
    )
}

export default Chat;