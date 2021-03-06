import React, { Component } from 'react';
import { login } from '../../func'
import { locateUser } from '../../func';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: '',
            password: '',
            error: null
        };
        this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.location = this.location.bind(this);
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
	}
	
	async location () {
		let location = locateUser();
		console.log(location);	
	}

    async submitHandler(e) {
        e.preventDefault();
        let result = await login(this.state);
            if (result.error) {
                console.log(result.error)
                this.setState({ error: result.error })
            } else {
                return (window.location = '/imageUpload');
            }
        // return result ? (window.location = '/mainpage') : null;
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.submitHandler}>
                    <input type="display_name" name="display_name" onChange={this.changeHandler} placeholder="display_name" /><br />
                    <input type="password" name="password" onChange={this.changeHandler} placeholder="password" /><br />
                    <button type="submit"> Submit </button>
					<a href="http://localhost:3001/ForgotPass">Forgot Password</a>
                </form>
				<button onClick={this.location}>Locate
				</button>
                <br />
            </div>
        );
	}	
}

export default Login;