import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';


const oldMessage = () => {

	let text = sessionStorage.getItem("newMessage")
	let user = sessionStorage.getItem("newMessageSender")
	sessionStorage.removeItem("newMessage")
	sessionStorage.removeItem("newMessageSender")
	console.log(sessionStorage)
	return (
	<div>
			<div className="messageContainer justifyStart">
			<p className="sentText pl-10">{user}</p>
			<div className="messageBox backgroundLight">
				<p className="messageText colorDark">{user}:{text}</p>
			</div>
			
		</div>
	</div>
	)
};

export default oldMessage