import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
// import Header from "./components/layout/Header";
/*just loads in the correct front end*/
import Home from "./App";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import ForgotPass from "./components/pages/ForgotPass";
import Search from "./components/pages/Search";
import Verify from "./components/pages/Verify";
import Profile from "./components/pages/Profile";
import ImageUpload from "./components/pages/ImageUpload";
import ProfileCarousel from "./components/ProfileCarousel/ProfileCarousel";
import ProfileView from "./components/ProfileView/ProfileView";
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

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Header />
						<div className="mainbody">
							<Route exact path="/" component={Home} />
							{/* <Route exact path="/login" component={Login} /> */}
							{/* <Route exact path="/register" component={Register} /> */}
							<Route exact path="/search" component={Search} />
							<Route exact path="/imageUpload" component={ImageUpload} />
							<Route exact path="/forgotPass" component={ForgotPass} />
							<Route path="/verify" component={Verify} />
							<Route path="/Profile" component={Profile} />
							<Route path="/ProfileCarousel" component={ProfileCarousel} />
							<Route path="/profiles/:id" component={ProfileView} />
						</div>
						<Footer />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
