import React, {Component} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import {sendToken} from '../../func';

class Verify extends Component{
	constructor(props) {
		super(props);
			this.state ={ 
				info : {mail: '', token: ''}
			}

		this.submit = this.submit.bind(this);
	}
	componentDidMount(){
		this.setState({
			info: queryString.parse(window.location.search)
		});
			// token: queryString.parse(window.location.search).token
	  }
	async submit(e) {
		e.preventDefault();
	   	let result = await sendToken(this.state.info);
		return result ? (window.location = '/') : null;
	} 
    render() {
        return (
            <div>
				<p>Your account has been verified!!!!</p>
				<a href="http://localhost:3001/" onClick={this.submit}>Click here to login</a>
				<input placeholder={this.state.info.mail}/>
				<input placeholder={this.state.info.token}/>
            </div>
        );
    }
}

export default Verify;