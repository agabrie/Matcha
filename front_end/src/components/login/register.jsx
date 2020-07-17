import React from 'react';
import loginLogo from './login_logo.jpg';
import { register } from "../../func";

 export class Register extends React.Component{
    constructor(props) {
		super(props);
		this.state={
			name:'',
			surname:'',
			email:'',
			display_name:'',
			password:'',
			passwordcon:'',
			userdata: null,
			success: false
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    async submitHandler(e) {
        e.preventDefault();
        await register(this.state).then((res) => {
					if (res.error) {
						return this.setState({ error:res.error });
			}
			return (window.location = "/");
			// return this.setState({ userdata: res, success: true });
				});
    }
    render() {
        return (
            <div className="base-container" ref={ this.props.containerRef }>
                <div className="content">
                	<div className="header">Register</div>
					<div className="image">
						<img src={ loginLogo } alt=''/>
					</div>
					{this.state.success && <p>You are successfully registered!</p>}
					<div className="form">
						<div className="form-group">
							<label htmlFor="firstname">Firstname</label>
							<input type="text" name="name" onChange={this.changeHandler} placeholder="firstname" />
							{this.state.errors && this.state.errors.name && <p>{this.state.errors.name.message}</p>}
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Lastname</label>
							<input type="text" name="surname" onChange={this.changeHandler} placeholder="lastname" />
							{this.state.errors && this.state.errors.surname && <p>{this.state.errors.surname.message}</p>}
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" onChange={this.changeHandler} placeholder="name@example.com" />
							{this.state.errors && this.state.errors.email && <p>{this.state.errors.email.message}</p>}
						</div>
						<div className="form-group">
							<label htmlFor="display_name">Display name</label>
							<input type="text" name="display_name" onChange={this.changeHandler} placeholder="display name" />
							{this.state.errors && this.state.errors.display_name && <p>{this.state.errors.display_name.message}</p>}	
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" onChange={this.changeHandler} placeholder="password" />
							{this.state.errors && this.state.errors.password && <p>{this.state.errors.password.message}</p>}
						</div>
						<div className="form-group">
							<label htmlFor="passwordcon">Confirm Password</label>
							<input type="password" name="passwordcon" onChange={this.changeHandler} placeholder="confirm password" />
							{this.state.errors && this.state.errors.passwrodcon && <p>{this.state.errors.passwordcon.message}</p>}
						</div>
					</div>
					<div className="button">
						<button type="button" className="btn" onClick={this.submitHandler}>Register</button>
					</div>
                </div>
            </div>
        )
    }
}