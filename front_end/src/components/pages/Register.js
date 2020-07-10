import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component{
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
    submitHandler(e) {
        e.preventDefault();
        axios.post('http://localhost:8001/api/Users',this.state).then(res => {
            if(res.data.errors) {
                return this.setState(res.data);
            }
            return this.setState({userdata:res, success:true}); 
        });
    }
    render() {
        return (
            <div>
                {this.state.success && <p>You are successfully registered!</p>}
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="name" onChange={this.changeHandler} placeholder="Firstname"/><br/>
                    {this.state.errors && this.state.errors.name && <p>{this.state.errors.name.message}</p>}
                    <input type="text" name="surname" onChange={this.changeHandler} placeholder="Lastname"/><br/>
                    {this.state.errors && this.state.errors.surname && <p>{this.state.errors.surname.message}</p>}
                    <input type="email" name="email" onChange={this.changeHandler} placeholder="name@example.com"/><br/>
                    {this.state.errors && this.state.errors.email && <p>{this.state.errors.email.message}</p>}
                    <input type="text" name="display_name" onChange={this.changeHandler} placeholder="Display name"/><br/>
                    {this.state.errors && this.state.errors.display_name && <p>{this.state.errors.display_name.message}</p>}
                    <input type="password" name="password" onChange={this.changeHandler} placeholder="password"/><br/>
                    {this.state.errors && this.state.errors.password&& <p>{this.state.errors.password.message}</p>}
                    <input type="password" name="passwordcon" onChange={this.changeHandler} placeholder="Confirm password"/>
                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }
}

export default Register;