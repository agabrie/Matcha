import React from 'react';
import loginLogo from './login_logo.jpg';
import axios from 'axios';

 export class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
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
    submitHandler(e) {
        e.preventDefault();
        axios.post('http://localhost:4000/api/login', this.state).then(res => {
            if(res.data.error) {
                return this.setState({error:res.data.message});
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
							<input type="text" name="email" onChange={this.changeHandler} placeholder="name@example.com" />
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