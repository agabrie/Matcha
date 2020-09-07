import React, { Component } from "react";
import axios from "axios";
import "./Picture.scss";
import {
	logOut
} from "../../func";
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	logout = () => {
		// sessionStorage.removeItem("id");
		// sessionStorage.clear();
		logOut()
		this.setState({ loggedInUser: null })
		
		return (window.location = "/");
	};
	gotoEdit = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/Edit");
	};
	componentDidMount() {
		let user = sessionStorage.getItem("id");
		this.setState({ loggedInUser: user });
	}
	render() {
		return (
			<div className="mainfooter">
				{this.state.loggedInUser && (
					<div className="footercontent right">
						<button className="btnContent small" onClick={this.gotoEdit}>
							Profile
						</button>
						<button className="btnContent" onClick={this.logout}>
							Logout
						</button>
					</div>
				)}
				<h1 className="text small">2020</h1>
			</div>
		);
	}
}

export default Footer;
