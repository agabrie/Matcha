import React, { Component } from "react";
import { login, formatError } from "../../../func";
import loginLogo from "../../login_logo.jpg";
import CenterStyle from "../CenterStyle";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
			error: null,
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	async submitHandler(e) {
		e.preventDefault();
		console.log(this.state);
		await login(this.state).then((res) => {
			if (res.error) {
				return this.setState({ error: formatError( res.error) });
			}
			// return (window.location = '/mainpage');

			return (window.location = "/imageUpload");
		});
	}
	render() {
		return (
			<div className="main-container">
				<p>Login</p>
				<div style={CenterStyle(0)}>
					<img width="80%" src={loginLogo} alt="" />
				</div>
				{this.state.error && (
					<div style={{ color: "red" }}>{this.state.error}</div>
				)}
				<label htmlFor="email">Email or Display Name</label>
				<br />
				<input
					type="text"
					name="login"
					onChange={this.changeHandler}
					placeholder="name@example.com"
				/>
				<br />

				<label htmlFor="password">Password</label>
				<br />
				<input
					type="password"
					name="password"
					onChange={this.changeHandler}
					placeholder="password"
				/>
				<br />
				<button type="button" className="btn" onClick={this.submitHandler}>
					Login
				</button>
				<div className="btnContent">
					<a href="/ForgotPass">Forgot Password</a>
				</div>
			</div>
		);
	}
}
 
export default Login;