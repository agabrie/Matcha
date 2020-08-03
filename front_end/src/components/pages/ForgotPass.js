import React, {Component} from 'react';
import {forgotPassword} from '../../func';

class ForgotPass extends Component{
	constructor(props) {
	super(props);
	this.state={
		login:'',
		success: false,
		error: null
	};
	this.changeHandler = this.changeHandler.bind(this);
	this.submitHandler = this.submitHandler.bind(this);
}

	changeHandler(e) {
        this.setState({
            login : e.target.value
        });
	}
	
	async submitHandler(e) {
        e.preventDefault();
        console.log(this.state)
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
            <div className="main-container">
				{this.state.success && <p>{this.state.success}</p>}
       			{this.state.error && <p>{this.state.error}</p>}
                {/* <form onSubmit={this.submitHandler}> */}
                    <input type="text" name="login" onChange={this.changeHandler} placeholder="email or display_name"/><br/>
                <button className="btn" onClick={this.submitHandler}> Submit </button>
                {/* </form> */}
                <br/>
            </div>
        );
	}	
}

export default ForgotPass;