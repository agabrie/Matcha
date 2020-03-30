import React from 'react';
import loginLogo from './login_logo.jpg';

 export class Login extends React.Component{
    constructor(props) {
        super(props);
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
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
					<div className="image">
						<img src={LoginLogo} />
					</div>
					<div className="form">
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="text" name="email" placeholder="name@example.com" />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" placeholder="password" />
						</div>
					</div>
                </div>
				<div className="footer">
					<button type="button" className="btn">Login</button>
				</div>
            </div>
        )
    }
}