import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import ImageUpload from "./components/pages/ImageUpload";
import Verify from "./components/pages/Verify";
import Profile from "./components/pages/Profile";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Header />
						<Route exact path="/" component={Home} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/imageUpload" component={ImageUpload} />
						<Route path="/verify" component={Verify} />
						<Route path="/Profile" component={Profile} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
