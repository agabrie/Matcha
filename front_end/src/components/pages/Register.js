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
            passwordcon:''
        }
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
        axios.post('http://localhost:4000/api/Users',this.state).then(function(result){
            if(result.data){
                this.setState(result.data);
            }
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler }>
                    <input type="text" name="name" onChange={this.changeHandler} placeholder="Firstname"/><br/>
                    <input type="text" name="surname" onChange={this.changeHandler} placeholder="Lastname"/><br/>
                    <input type="email" name="email" onChange={this.changeHandler} placeholder="name@example.com"/><br/>
                    <input type="text" name="display_name" onChange={this.changeHandler} placeholder="Display name"/><br/>
                    <input type="password" name="password" onChange={this.changeHandler} placeholder="password"/><br/>
                    <input type="password" name="passwordcon" onChange={this.changeHandler} placeholder="Confirm password"/>
                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }
}

export default Register;