import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{
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
        axios.post('http://localhost:8000/api/login', this.state).then(res => {
            if(res.data.error) {
                return this.setState({error:res.data.message});
            }
            return (window.location = '/mainpage');
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.submitHandler}>
                    <input type="email" name="email" onChange={this.changeHandler} placeholder="name@example.com"/><br/>
                    <input type="password" name="password" onChange={this.changeHandler} placeholder="password"/><br/>
                    <button type="submit"> Submit </button>
                </form>
                <br/>
            </div>
        );
    }
}

export default Login;