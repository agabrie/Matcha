import React, {Component} from 'react';
import {resetPassword} from '../../func';
import queryString from 'query-string';

class ForgotPass extends Component{
	constructor(props) {
	super(props);
	this.state={
		display_name: '',
		password:'',
		passswordcon: '',
		success: false,
		error: null
	};
	this.changeHandler = this.changeHandler.bind(this);
	this.submitHandler = this.submitHandler.bind(this);
}

	componentDidMount(){
		this.setState({
			display_name: queryString.parse(window.location.search)
		});
	}

	changeHandler(e) {
        this.setState({
			[e.target.name]: e.target.value
        });
	}
	
	async submitHandler(e) {
        e.preventDefault();
		let result = await resetPassword(this.state);
        if(result.error){
            this.setState({error:result.error})
        } else {
            this.setState({success:"Password has been reset!!"})
        }
        console.log(result);
    }

    render() {
        return (
            <div>
				{this.state.success && <p>{this.state.success}</p>}
       			{this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.submitHandler}>
					<input type="password" name="password" onChange={this.changeHandler} placeholder="password"/><br/>
                    <input type="password" name="passwordcon" onChange={this.changeHandler} placeholder="Confirm password"/>
                    <button type="submit"> Submit </button>
                </form>
                <br/>
            </div>
        );
	}	
}

export default ForgotPass;