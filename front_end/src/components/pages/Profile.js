import React, { Component } from "react";
// import axios from "axios";
import { uploadProfile,getUserData,getProfileData, locateUser } from "../../func";
import "../../App.scss";
// import CenterStyle from "./CenterStyle";
import ImageUpload from "./ImageUpload";
import Selector from "./Selector";


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
		this.changeHandler = this.changeHandler.bind(this);
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	async componentDidMount() {
		// token: queryString.parse(window.location.search).token
		let data = await getUserData();
		this.setState({
			name: data.name,
			surname: data.surname,
			display_name: data.display_name,
			email: data.email,
		});
		// console.log(this.state);
		// return data
	}
	render() {
		// console.log(this.state);
		return (
			<div className="main-container">
				<p>User</p>
				<label htmlFor="name">First Name</label>
				<br />
				<input
					type="text"
					name="name"
					defaultValue={this.state.name}
					onChange={this.changeHandler}
				/>
				<br></br>
				<label htmlFor="surname">Last Name</label>
				<br />
				<input
					type="text"
					name="surname"
					defaultValue={this.state.surname}
					onChange={this.changeHandler}
				/>
				<br></br>
				<label htmlFor="display_name">Display Name</label>
				<br />
				<input
					type="text"
					name="display_name"
					defaultValue={this.state.display_name}
					onChange={this.changeHandler}
				/>
				<br></br>
				<label htmlFor="email">Email</label>
				<br />
				<input
					type="text"
					name="email"
					defaultValue={this.state.email}
					onChange={this.changeHandler}
				/>
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
			biography: "",
			gender: "Male",
			sexual_preference: "Both",
			date_of_birth:this.formatDate(Date.now())
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.dateHandler = this.dateHandler.bind(this);
		this.formatDate = this.formatDate.bind(this);
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
		// console.log(this.state);
	}
	dateHandler(e) {
		let date = new Date(e.target.value);
		let selectedYear = date.getFullYear();
		let selectedMonth = date.getMonth()+1;
		let selectedDay = date.getDate();

		let currentDate = new Date();
		let currentYear = currentDate.getFullYear();

		if (selectedYear > currentYear - 18) selectedYear = currentYear - 18;
		if (selectedYear < currentYear - 68) selectedYear = currentYear - 68;
		if (selectedMonth < 10)
			selectedMonth = `0${selectedMonth}`;
		if (selectedDay < 10) selectedDay = `0${selectedDay}`;

		let selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
		this.setState({date_of_birth:selectedDate})
	}
	formatDate(date) {
		// console.log(date);
		let d = new Date(date);
		let year = d.getFullYear();
		let month = d.getMonth() + 1;
		let day = d.getDate();
		if (month < 10) month = `0${month}`;
		if (day < 10) day = `0${day}`;
		let fdate = `${year}-${month}-${day}`;
		// console.log(fdate);
		return fdate;
	}
	async submitHandler(e) {
		// console.log("save profile!");
		// console.log(this.state);
		await uploadProfile(this.state);
	}
	async componentDidMount() {
		// token: queryString.parse(window.location.search).token
		let data = await getProfileData();
		if (!data.error) {
			console.log(data)
			this.setState({
				gender:data.profile.gender,
				sexual_preference:data.profile.sexual_preference,
				biography: data.profile.biography,
				date_of_birth:this.formatDate(data.profile.date_of_birth)
			})
		}
		let location = await locateUser().then((res) => {

			console.log("location", res);
			this.setState({
				location: `(${res.latitude}, ${res.longitude})`
			});
		})
		
	}
	render() {
		// console.log(this.state)
		return (
			<div className="main-container">
				<p>Profile</p>

				<label htmlFor="gender">Gender</label>
				<br />
				<Selector
					name="gender"
					values={["Male", "Female"]}
					value={this.state.gender}
					onClick={this.changeHandler}
				/>
				<br />

				<label htmlFor="sexual_preference">Sexual Preference</label>
				<br />
				<Selector
					name="sexual_preference"
					text={["None", "Males", "Females"]}
					values={["Both", "Male", "Female"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<br />

				<label htmlFor="biography">Biography</label>
				<br />
				<textarea
					name="biography"
					onChange={this.changeHandler}
					value={this.state.biography}
					placeholder="me is here!"
				/>
				<br />

				<label htmlFor="date_of_birth">Date Of Birth</label>
				<br />
				<input
					type="date"
					name="date_of_birth"
					onChange={this.dateHandler}
					value={this.state.date_of_birth}
					
				/>
				<br />

				{/* <label htmlFor="getLocation">Location</label> */}
				{/* <br /> */}

				<button className="btn" onClick={this.submitHandler}>
					save
				</button>
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
		// let data = await axios
		// 	.get(`http://localhost:8002/api/users/${sessionStorage.display_name}`)
		// 	.then((res) => {
		// 		return res.data;
		// 	});
		// console.log(data);
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
		// let data = await axios
		// 	.get(`http://localhost:8002/api/users/${sessionStorage.display_name}`)
		// 	.then((res) => {
		// 		return res.data;
		// 	});
		// console.log(data);
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
