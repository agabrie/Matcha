import React, { Component } from "react";
import "./Picture.scss";
import CenterStyle from "./CenterStyle";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { loggedInUser: null };
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
		this.setState({ loggedInUser: user });
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
					</div>
				)}
				{this.state.loggedInUser ? (
					<div className="headercontent right">
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
