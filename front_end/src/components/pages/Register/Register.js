import React, { Component } from "react";
import { register, isStrongPassword, formatError } from "../../../func";
import loginLogo from "../../login_logo.jpg";
import CenterStyle from "../CenterStyle";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			surname: "",
			email: "",
			display_name: "",
			password: "",
			passwordcon: "",
			userdata: null,
			success: false,
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	changeHandler(e) {
		this.setState({
			error: null,
			success: null,
			[e.target.name]: e.target.value,
		});
	}
	async submitHandler(e) {
		e.preventDefault();
		const { password, passwordcon } = this.state;
		if (password) {
			if (!isStrongPassword(password)) {
				this.setState({
					error:
						"Password must contain digits,upperCase and lowercase letters and be greater than 8 characters",
				});
				return;
			}
			// eslint-disable-next-line
			if (password != passwordcon) {
				this.setState({ error: "passwords dont match" });
				return;
			}
		}
		await register(this.state).then((res) => {
			if (res.error) {
				return this.setState({ error: formatError(res.error) });
			}
			return (window.location = "/");
			// return this.setState({ userdata: res, success: true });
		});
	}
	render() {
		return (
			<div className="main-container">
				<p>Register</p>
				<div style={CenterStyle(0)}>
					<img className="logoImage" src={loginLogo} alt="" />
				</div>
				{this.state.error && (
					<div style={{ color: "red" }}>{this.state.error}</div>
				)}
				<label htmlFor="firstname">Firstname</label>
				<br />
				<input
					type="text"
					name="name"
					onChange={this.changeHandler}
					placeholder="firstname"
				/>
				{this.state.errors && this.state.errors.name && (
					<p>{this.state.errors.name.message}</p>
				)}
				<br />
				<label htmlFor="lastname">Lastname</label>
				<br />
				<input
					type="text"
					name="surname"
					onChange={this.changeHandler}
					placeholder="lastname"
				/>
				{this.state.errors && this.state.errors.surname && (
					<p>{this.state.errors.surname.message}</p>
				)}
				<br />

				<label htmlFor="email">Email</label>
				<br />
				<input
					type="email"
					name="email"
					onChange={this.changeHandler}
					placeholder="name@example.com"
				/>
				{this.state.errors && this.state.errors.email && (
					<p>{this.state.errors.email.message}</p>
				)}
				<br />
				<label htmlFor="display_name">Display name</label>
				<br />
				<input
					type="text"
					name="display_name"
					onChange={this.changeHandler}
					placeholder="display name"
				/>
				{this.state.errors && this.state.errors.display_name && (
					<p>{this.state.errors.display_name.message}</p>
				)}
				<br />
				<label htmlFor="password">Password</label>
				<br />
				<input
					type="password"
					name="password"
					onChange={this.changeHandler}
					placeholder="password"
				/>
				{this.state.errors && this.state.errors.password && (
					<p>{this.state.errors.password.message}</p>
				)}
				<br />

				<label htmlFor="passwordcon">Confirm Password</label>
				<br />
				<input
					type="password"
					name="passwordcon"
					onChange={this.changeHandler}
					placeholder="confirm password"
				/>
				{this.state.errors && this.state.errors.passwrodcon && (
					<p>{this.state.errors.passwordcon.message}</p>
				)}
				<br />
				<button type="button" className="btn" onClick={this.submitHandler}>
					Register
				</button>

				{/* <a href="/ForgotPass">Forgot Password</a> */}
			</div>
		);
	}
}

export default Register;
