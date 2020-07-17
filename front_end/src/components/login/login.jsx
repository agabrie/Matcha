import React from 'react';
import loginLogo from './login_logo.jpg';
import { login } from "../../func";

 export class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            login:'',
            password:'',
            error: null
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
        console.log(this.state)
        await login(this.state)
            .then(res => {
            if(res.error) {
                return this.setState({error:res.error});
            }
            return (window.location = '/mainpage');
        });
    }
    render() {
        return (
            <div className="base-container" ref={ this.props.containerRef }>
                <div className="header">Login</div>
                <div className="content">
					<div className="image">
						<img src={ loginLogo } alt='' />
					</div>
                    {this.state.error && <p>{this.state.error}</p>}
					<div className="form">
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="text" name="login" onChange={this.changeHandler} placeholder="name@example.com" />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" name="password"onChange={this.changeHandler} placeholder="password" />
						</div>
					</div>
                    <div className="button">
						<button type="button" className="btn" onClick={this.submitHandler}>Login</button>
					</div>
                </div>
            </div>
        );
    }
}