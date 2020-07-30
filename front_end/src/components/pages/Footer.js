import React, { Component } from "react";
import "./Picture.scss";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	logout = () => {
		// sessionStorage.removeItem("id");
		sessionStorage.clear();
		this.setState({ loggedInUser: null });
		return (window.location = "/");
	};
	gotoProfile = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/Profile");
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
						<button className="btnContent" onClick={this.gotoProfile}>
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
