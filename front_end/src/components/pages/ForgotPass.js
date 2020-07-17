import React, {Component} from 'react';
import {forgotPassword} from '../../func';

class ForgotPass extends Component{
	constructor(props) {
	super(props);
	this.state={
		display_name:'',
		success: false,
		error: null
	};
	this.changeHandler = this.changeHandler.bind(this);
	this.submitHandler = this.submitHandler.bind(this);
}

	changeHandler(e) {
        this.setState({
            display_name : e.target.value
        });
	}
	
	async submitHandler(e) {
        e.preventDefault();
		let result = await forgotPassword(this.state);
        if(result.error){
            this.setState({error:result.error})
        } else {
            this.setState({success:"Password Reset email has been sent"})
        }
        console.log(result);
    }

    render() {
        return (
            <div>
				{this.state.success && <p>{this.state.success}</p>}
       			{this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.submitHandler}>
                    <input type="display_name" name="display_name" onChange={this.changeHandler} placeholder="display_name"/><br/>
                    <button type="submit"> Submit </button>
                </form>
                <br/>
            </div>
        );
	}	
}

export default ForgotPass;