import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import ForgotPass from "./components/pages/ForgotPass";
import Search from "./components/pages/Search";
import Verify from "./components/pages/Verify";
import Edit from "./components/pages/Edit";
import ImageUpload from "./components/pages/ImageUpload";
import ProfileCarousel from "./components/ProfileCarousel/ProfileCarousel";
import ProfileView from "./components/ProfileView/ProfileView";

class App extends Component {
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
						</div>
						<Footer />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
