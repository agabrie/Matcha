import React, { Component } from "react";
import axios from "axios";
import { uploadProfile } from "../../func";
import "../../App.scss";
import CenterStyle from "./CenterStyle";
import ImageUpload from "./ImageUpload";
class Switch extends Component{
	constructor(props) {
		super(props);
		this.state = {
			textOn: this.props.texton,
			textOff: this.props.textoff,
			colorOn: this.props.colorOn ? this.props.coloron : '#2196f3',
			colorOff: this.props.colorOff ? this.props.coloroff : "#ccc",
		};
	}
	render() {
		const { textOn, textOff, colorOn, colorOff } = this.state;
		console.log("colorOn -> ", colorOn);
		console.log("colorOn -> ", colorOff);
		return (
			<div>
			<label className="switch">
				<input type="checkbox"/>
					<span className="slider round" text-on={textOn} text-off={textOff} color-on={colorOn} color-off={colorOff}></span>
				</label>
			</div>
		);
	}
}
/*
class Switch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			id: this.props.id,
		};
	}
	render() {
		const { name, id } = this.state;
		return (
			<div className="switch">
				<label class="switch-label" htmlFor={name}>
					<span class="switch-thumb" />
					<span class="switch-rail" />
					Toggle Me!
				</label>
				<input
					type="checkbox"
					className="switch-checkbox"
					name={name}
					id={id}
				/>
			</div>
		);
	}
}
*/
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			surname: null,
			display_name: null,
			email: null,
			// password: null,
		};
	}
	async componentDidMount() {
		// token: queryString.parse(window.location.search).token
		let data = await axios
			.get(`http://localhost:8002/api/users/${sessionStorage.display_name}`)
			.then((res) => {
				return res.data;
			});
		this.setState({
			name: data.name,
			surname: data.surname,
		});
		console.log(this.state);
		// return data
	}
	render() {
		return (
			<div className="main-container">
				<p>User</p>
				<label htmlFor="firstname">First Name</label>
				<br />
				<input
					type="text"
					name="firstname"
					defaultValue={this.state.name}
					onChange={this.changeHandler}
				/>
				<br></br>
				<label htmlFor="lastname">Last Name</label>
				<br />
				<input type="text" name="lastname" onChange={this.changeHandler} />
				<br></br>
				<label htmlFor="display_name">Display Name</label>
				<br />
				<input type="text" name="display_name" onChange={this.changeHandler} />
				<br></br>
				<label htmlFor="email">Email</label>
				<br />
				<input type="text" name="email" onChange={this.changeHandler} />
				<br></br>
				<button className="btn">save</button>
			</div>
		);
	}
}
class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			surname: null,
			display_name: null,
			email: null,
			// password: null,
		};
	}
	async componentDidMount() {
		// token: queryString.parse(window.location.search).token
		let data = await axios
			.get(`http://localhost:8002/api/users/${sessionStorage.display_name}`)
			.then((res) => {
				return res.data;
			});
		console.log(data);
		// return data
	}
	render() {
		return (
			<div className="main-container">
				<p>Profile</p>
				{/* <label htmlFor="firstname">First Name</label>
				<br />
				<input type="text" name="firstname" onChange={this.changeHandler} />
				<br></br>
				<label htmlFor="lastname">Last Name</label>
				<br />
				<input type="text" name="lastname" onChange={this.changeHandler} />
				<br></br>
				<label htmlFor="display_name">Display Name</label>
				<br />
				<input type="text" name="display_name" onChange={this.changeHandler} />
				<br></br>
				<label htmlFor="email">Email</label>
				<br />
				<input type="text" name="email" onChange={this.changeHandler} />
				<br></br> */}
				<Switch texton="M" textoff="F"  coloroff='#b19cd9' />
				<label htmlFor="biography">Biography</label>
				<br />
				<textarea name="biography" onChange={this.changeHandler} />
				<br></br>
				<button className="btn">save</button>
			</div>
		);
	}
}
class Other extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			surname: null,
			display_name: null,
			email: null,
			// password: null,
		};
	}
	async componentDidMount() {
		// token: queryString.parse(window.location.search).token
		let data = await axios
			.get(`http://localhost:8002/api/users/${sessionStorage.display_name}`)
			.then((res) => {
				return res.data;
			});
		console.log(data);
		// return data
	}
	render() {
		return (
			<div className="main-container">
				<p>Other</p>
				<ImageUpload />
				<button className="btn">save</button>
			</div>
		);
	}
}
// export default Profile;
class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: null,
			lastname: null,
			display_name: null,
			email: null,
			biography: null,
			gender: null,
			sexual_preference: null,
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	async componentDidMount() {
		// token: queryString.parse(window.location.search).token
		let data = await axios
			.get(`http://localhost:8002/api/users/${sessionStorage.display_name}`)
			.then((res) => {
				return res.data;
			});
		console.log(data);
		// return data
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
		// console.log(this.state[e.target.name])
	}
	async submitHandler(e) {
		e.preventDefault();
		let result = await uploadProfile(this.state);
		if (result.error) {
			this.setState({ error: result.error });
		} else {
			this.setState({ success: "You are successfully registered" });
			//    return (window.location = '/');
		}
		console.log(result);
	}
	render() {
		return (
			<div>
				{/* <p>Edit</p> */}
				{/* <div style={CenterStyle(0)}> */}
					{/* <div style={{ textAlign: "center", justifyContent: "center" }}> */}
					{/* </div> */}
					<User />
					{/* <div className="vl"></div> */}
					<Profile />
					{/* <div className="vl"></div> */}
				<Other />
				
				{/* </div> */}
				{/* {console.log(this.state)}
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
                </form> */}
			</div>
		);
	}
}

export default Edit;
