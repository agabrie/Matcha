import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import ForgotPass from "./components/pages/ForgotPass";
import Search from "./components/pages/Search/Search";
import Verify from "./components/pages/Verify";
import Edit from "./components/pages/Edit";
import ImageUpload from "./components/pages/ImageUpload";
import ProfileCarousel from "./components/ProfileCarousel/ProfileCarousel";
import ProfileView from "./components/ProfileView/ProfileView";
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Likes from './components/pages/Likes';
import Matches from "./components/pages/Matches";
import io from 'socket.io-client';
import queryString from 'query-string';
// import { Login } from "./components/login/l"
// import { Register } from "./components/login/register";

// import  Register  from "./components/login/register"; 

// import "./App.css";
// class Home extends Component {
// 	componentDidMount() {
// 		return (window.location = "/login")
// 	}
// 	render() {
// 		return(<div></div>)
// 	}
// }

let socket;
const ENDPOINT = 'localhost:4001';

class App extends Component {
	componentDidMount() {
		socket = io.connect(ENDPOINT);
		console.log("query:", queryString.parse(window.location.search))
		socket.on('chat', (message) => {
			console.log("receiving message:")
			console.log("message is:", message.text)
			if (message.user !== 'admin'){
				sessionStorage.setItem('newMessage', message.text);
			sessionStorage.setItem('newMessageSender', message.user);
			console.log("sessionStoraget is now:", sessionStorage)
			}
	
		})
	}
	
	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Header />
						<div className="mainbody">
							{/* <Route exact path="/" component={Home} /> */}
							<Route exact path="/" component={Login} />
							<Route exact path="/Register" component={Register} />
							{/* <Route exact path="/register" component={Register} /> */}
							<Route exact path="/search" component={Search} />
							<Route exact path="/imageUpload" component={ImageUpload} />
							<Route exact path="/forgotPass" component={ForgotPass} />
							<Route path="/verify" component={Verify} />
							<Route path="/Edit" component={Edit} />
							<Route path="/ProfileCarousel" component={ProfileCarousel} />
							<Route path="/profiles/:id" component={ProfileView} />
							<Route path="/Join" component={Join} />
							<Route path="/Chat" component={Chat} />
							<Route exact path="/likes" component={Likes} />
							<Route exact path="/matches" component={Matches} />
						</div>
						<Footer />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
