import React from 'react';
import DropDown from './DropDown';
import './editStyle.css';
import { addProfile } from "../../func";
import axios from 'axios';;

class editProfile extends React.Component{
    constructor(props) {
		super(props);
		this.state={
			gender:'',
			sexual_preference:'',
            biography:'',
			date_of_birth:'',
            location:'(0, 0)',
            genderOptions: ['Male', 'Female', 'Other'],
            preferences: ['Men', 'Women', 'Both']
		};
		this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    componentWillMount(){
        this.getLocation();
    }

    async getLocation(){
        const response = await axios.get('https://api.ipify.org?format=json')
        const location = await axios.get(`http://ip-api.com/json/${response.data.ip}`)
        this.state.location = ( '(' + location.data.lat + ',' + location.data.lon +')' )
        
    }
    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    async submitHandler(e) {
        e.preventDefault();
        const newProfile = {
            gender:this.state.gender,
			sexual_preference:this.state.sexual_preference,
            biography:this.state.biography,
            location: this.state.location,
            date_of_birth:this.state.date_of_birth,
            fame: 0
        }

        const userid = sessionStorage.getItem("id")
        addProfile(userid, newProfile)
    }
    render() {
        return (
            <div className="profileForm">
                <div className="content">
					<div className="form">
						<div className="form-group">
                            <DropDown title={'I identify as:'}
                            name={'gender'}
                            options = {this.state.genderOptions} 
                            value = {this.state.gender}
                            placeholder = {'Select gender'}
                            handleChange = {this.changeHandler}
                            />
						</div>
						<div className="form-group">
                            <DropDown title={'I am attracted to:'}
                            name={'sexual_preference'}
                            options = {this.state.preferences} 
                            value = {this.state.sexual_preference}
                            placeholder = {'Select sexual preference'}
                            handleChange = {this.changeHandler}
                            />
						</div>
						<div className="form-group">
							<label className="bio">An interesting thing about me is:</label>
                            <textarea
                            className="bio input"
                            name="biography"
                            rows="2"
                            cols="30"
                            value={this.state.biography}
                            onChange={this.changeHandler}
                            placeholder="Enter a short bio"
                            />
                        </div>
						<div className="form-group">
							<label htmlFor="date_of_birth">My birthday is on: </label>
							<input className="input" type="date" name="date_of_birth" onChange={this.changeHandler} placeholder="password" />
						</div>
					</div>
					<div className="button">
						<button type="button" className="btn" onClick={this.submitHandler}>Update Profile</button>
					</div>
                </div>
            </div>
        )
    }
}

export default editProfile;