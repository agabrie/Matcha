import React, { Component } from "react";
import queryString from "query-string";
// import axios from 'axios';
import { sendToken} from "../../func";

class Verify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			token: ""
		};

		this.submit = this.submit.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}
	componentDidMount() {
		let info = queryString.parse(window.location.search);
		let { login, token } = info;
		this.setState({
			login: login,
			token:token
		});
		// token: queryString.parse(window.location.search).token
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	async submit(e) {
		e.preventDefault();
		let result = await sendToken(this.state);
		return result ? (window.location = "/") : null;
	}
	render() {
		const { login, token } = this.state;
		console.log(this.state);
		return (
			<div className="main-container">
				{/* <p>Your account has been verified!!!!</p> */}
				
				{/* <a href="http://localhost:3002/" onClick={this.submit}>
							Click here to login
						</a> */}
				<input type="text" name="login" value={login} placeholder={login} onChange={this.changeHandler} />
				<input type="text" name="token" value={token} placeholder={token} onChange={this.changeHandler} />
				<button className="btn" onClick={this.submit}>
					Verify account
				</button>
			</div>
		);
	}
}

export default Verify;
