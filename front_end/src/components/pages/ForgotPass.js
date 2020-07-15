import React, {Component} from 'react';

class ForgotPass extends Component{

    render() {
        return (
            <div>
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