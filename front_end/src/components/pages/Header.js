import React, { Component } from "react";
import "./Picture.css";

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
	gotoLogin = () => {
		// sessionStorage.removeItem("id")
		// this.setState({ loggedInUser: null });
		return (window.location = "/");
	};
	componentDidMount() {
		let user = sessionStorage.getItem("id");
		this.setState({ loggedInUser: user });
	}
	render() {
		return (
			<div className="mainheader">
				<h1 className="text big">Matcha</h1>
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
					</div>
				)}
			</div>
		);
	}
}

export default Header;
