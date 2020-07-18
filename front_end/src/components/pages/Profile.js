import React, {Component} from 'react';
import axios from 'axios';
import {uploadProfile, login} from '../../func';


class Profile extends Component{

constructor(props){
	super(props)
	this.state={
		firstname:null,
		lastname:null,
		display_name:null,
		email:null,
		biography:null,
		gender:null,
		sexual_preference:null
	}
		this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
}
		async componentDidMount(){
			// token: queryString.parse(window.location.search).token
			let data = await axios.get(`http://localhost:8001/api/users/${sessionStorage.display_name}`)
			// console.log(data);
			// return data
			
		}
		changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
		});
		// console.log(this.state[e.target.name])
	}
    async submitHandler(e) {
		e.preventDefault();
        let result = await uploadProfile(this.state);
        if(result.error){
            this.setState({error:result.error})
        } else {
            this.setState({success:"You are successfully registered"})
        //    return (window.location = '/');
        }
        console.log(result);
    }
    render() {
        return (
            <div>
				{console.log(this.state)}
                <form onSubmit={this.submitHandler}>
					<label htmlFor="firstname">First Name</label>
						<input type="text" name="firstname" onChange={this.changeHandler} /><br></br>
					<label htmlFor="lastname">Last Name</label>
						<input type="text" name="lastname" onChange={this.changeHandler} /><br></br>
					<label htmlFor="display_name">Display Name</label>
						<input type="text" name="display_name" onChange={this.changeHandler}  /><br></br>
					<label htmlFor="email">Email</label>
						<input type="text" name="email" onChange={this.changeHandler}  /><br></br>
					<label htmlFor="biography">Biography</label>
						<input type="text" name="biography" onChange={this.changeHandler}  /><br></br>


					<fieldset id="group1">
						<label htmlFor="radio">Gender:</label><br></br>
						<input type="radio" id="male" name="gender" onChange={this.changeHandler} value="Male" checked/>
						<label htmlFor="male" onClick={this.changeHandler}>Male</label><br></br>
						<input type="radio" id="female" name="gender" onChange={this.changeHandler} value="Female"/>
						<label htmlFor="female" onClick={this.changeHandler}>Female</label><br></br>
						<input type="switch" />
  					</fieldset>

  					<fieldset id="group2">
						<label htmlFor="radio">Sexual Preference:</label><br></br>
						<input type="radio" id="male2" name="sexual_preference" onChange={this.changeHandler} value="Male"/>
						<label htmlFor="male2" onClick={this.changeHandler}>Male</label><br></br>

						<input type="radio" id="female2" name="sexual_preference" onChange={this.changeHandler} value="Female"/>
						<label htmlFor="female2" onClick={this.changeHandler}>Female</label><br></br>

						<input type="radio" id="both2" name="sexual_preference" onChange={this.changeHandler} value="Both" checked/>
						<label htmlFor="both2" onClick={this.changeHandler}>Both</label><br></br>
  					</fieldset>
                    <button type="submit" onClick={this.submitHandler}> Submit </button>
                </form>
            </div>
        );
    }
}

export default Profile;