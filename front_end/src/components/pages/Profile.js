import React, {Component} from 'react';
import axios from 'axios';


class Profile extends Component{


	componentDidMount(){
			// token: queryString.parse(window.location.search).token
	  }
	  changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submitHandler(e) {

    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
					<label for="Firstname">Firstname</label>
						<input type="text" name="Firstname" onChange={this.changeHandler} placeholder="" /><br></br>
					<label for="Lastname">Lastname</label>
						<input type="text" name="Lastname" onChange={this.changeHandler} placeholder="" /><br></br>
					<label for="username">username</label>
						<input type="text" name="username" onChange={this.changeHandler} placeholder="" /><br></br>
					<label for="email">email</label>
						<input type="text" name="email" onChange={this.changeHandler} placeholder="" /><br></br>
					<label for="Bio">Bio</label>
						<input type="text" name="Bio" onChange={this.changeHandler} placeholder="" /><br></br>


					<fieldset id="group1">
						<label for="radio">Gender:</label><br></br>
						<input type="radio" id="male" name="gender" value="male"/>
						<label for="male">male</label><br></br>
						<input type="radio" id="female" name="gender" value="female"/>
						<label for="female">Female</label><br></br>
  					</fieldset>

  					<fieldset id="group2">
						<label for="radio">Sexual Preference:</label><br></br>
						<input type="radio" id="male" name="gender" value="male"/>
						<label for="male">male</label><br></br>
						<input type="radio" id="female" name="gender" value="female"/>
						<label for="female">Female</label><br></br>
  					</fieldset>
                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }
}

export default Profile;