import React, { Component } from "react";
import "./Picture.scss";
import CenterStyle from "./CenterStyle";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { loggedInUser: null,
		username: null };
	}

	gotoSearch = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/search");
	};
	gotoLikes = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/likes");
	};
	gotoMatches= () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/matches");
	};
	gotoLogin = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/");
	};
	gotoRegister = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/Register");
	};
	componentDidMount() {
		let user = sessionStorage.getItem("id");
		let username = sessionStorage.getItem("display_name");
		this.setState({ loggedInUser: user,
		username: username });
	}
	render() {
		return (
			<div className="mainheader">
				<div style={CenterStyle(10)}>
					<div className="text big">Matcha</div>
				</div>
				{this.state.loggedInUser && (
					<div className="headercontent left">
						<button className="btnContent" onClick={this.gotoLikes}>
							Likes
						</button>
						<button className="btnContent" onClick={this.gotoMatches}>
							Matches
						</button>
					</div>
				)}
				{this.state.loggedInUser ? (
					<div className="headercontent right">
						<p>{sessionStorage.getItem("display_name")}</p>
						<button className="btnContent" onClick={this.gotoSearch}>
							Search
						</button>
					</div>
				) : (
					<div className="headercontent right">
						<button className="btnContent" onClick={this.gotoLogin}>
							Login
						</button>
						<button className="btnContent" onClick={this.gotoRegister}>
							Register
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default Header;
