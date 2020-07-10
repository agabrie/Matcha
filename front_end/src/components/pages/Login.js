import React, { Component } from 'react';
import axios from 'axios';
import { login } from '../../func'

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
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                </form>
                <br />
            </div>
        );
	}	
}

export default Login;