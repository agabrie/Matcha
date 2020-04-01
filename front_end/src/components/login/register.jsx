import React from 'react';
import loginLogo from './login_logo.jpg';

 export class Register extends React.Component{
    constructor(props) {
        super(props);
    }

    // changeHandler(e) {
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     });
    // }
    // submitHandler(e) {
    //     e.preventDefault();
    //     axios.post('http://localhost:4000/api/login', this.state).then(res => {
    //         if(res.data.error) {
    //             return this.setState({error:res.data.message});
    //         }
    //         return (window.location = '/mainpage');
    //     });
    // }
    render() {
        return (
            <div className="base-container" ref={ this.props.containerRef }>
                <div className="header">Register</div>
                <div className="content">
					<div className="image">
						<img src={ loginLogo } />
					</div>
					<div className="form">
						<div className="form-group">
							<label htmlFor="firstname">Firstname</label>
							<input type="text" name="firstname" placeholder="firstname" />
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Lastname</label>
							<input type="text" name="lastname" placeholder="lastname" />
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" placeholder="name@example.com" />
						</div>
						<div className="form-group">
							<label htmlFor="display_name">Display name</label>
							<input type="text" name="display_name" placeholder="display name" />
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" placeholder="password" />
						</div>
						<div className="form-group">
							<label htmlFor="passwordcon">Confirm Password</label>
							<input type="password" name="passwordcon" placeholder="confirm password" />
						</div>
					</div>
                </div>
				<div className="footer">
					<button type="button" className="btn">Register</button>
				</div>
            </div>
        )
    }
}