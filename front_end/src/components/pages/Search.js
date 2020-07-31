import React, { Component } from "react";
import axios from "axios";
import { CenterStyle } from "./CenterStyle";
import { checkVerified } from "../../func";

class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			user: props.user,
			id: props.user.id,
			display_name: props.user.display_name,
			name: props.user.name,
			surname: props.user.surname,
			gender: props.user.profile.gender,
			age: props.user.profile.age,
			images: props.user.images,
			biography: props.user.profile.biography,
			fame: props.user.profile.fame,

			color: { Male: "cyan", Female: "pink", null: "grey" },
		};
		this.handleClick = this.handleClick.bind(this);
		// this.registerView = this.registerView.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		console.log("clicked profile");
	}

	componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState = {
			user: display_name,
		};
	}
	render() {
		return (
			<div style={CenterStyle(0)}>
				<div
					style={{
						backgroundColor: this.state.color[this.state.gender],
						borderRadius: "10px",
						padding:"20px"
					}}
				>
					<div>
						<p>{this.state.id}</p>
						<p>
							{this.state.display_name} : {this.state.name} {this.state.surname}
						</p>
						{this.state.images.map((elem, index) => (
							<img
								key={index}
								src={`${elem.type},${elem.data}`}
								width="100vw"
								alt=""
							/>
						))}
						<div>
							<p>age:{this.state.age}</p>
							<p>biography:{this.state.biography}</p>
							<p>fame:{this.state.fame}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class UserCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			user: props.user,
			id: props.user.id,
			display_name: props.user.display_name,
			images: props.user.images,
			gender: props.user.profile.gender,
			age: props.user.profile.age,
			color: { Male: "cyan", Female: "pink", null: "grey" },
		};
		this.handleClick = this.handleClick.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		console.log("clicked user");
		let check = await checkVerified();
		console.log("check",check);
		if (check)
			return (window.location = check)
		let { id, display_name, index } = this.state;
		await this.props.registerView(id);
		console.log("dn & index =>", display_name, index);
		await this.props.getProfile(display_name, index);
	}

	componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState = {
			user: display_name,
		};
	}
	render() {
		return (
			<div style={CenterStyle(0)}>
				<div
					onClick={this.handleClick}
					style={{
						backgroundColor: this.state.color[this.state.gender],
						borderRadius: "10px",
						padding:"20px"
					}}
				>
					<div>
						{/* <p>{this.state.id}</p> */}
						<p>
							{this.state.display_name}
						</p>
						{this.state.images.map((elem, index) => (
							<img
								key={index}
								src={`${elem.type},${elem.data}`}
								width="100vw"
								alt=""
							/>
						))}
						<div>
							<p>age:{this.state.age}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			display_name: null,
		};
		this.registerView = this.registerView.bind(this);
		this.getProfile = this.getProfile.bind(this);
	}
	async getProfile(display_name, index) {
		await axios
			.get(`http://localhost:8002/api/profiles/${display_name}/all`)
			.then((results) => {
				let { users } = this.state;
				// console.log("users=>", users, index);
				// console.log("profile before => ", users[index]);
				let user = users[index];
				let profile = user.profile;
				results.data.profile = { ...profile, ...results.data.profile };
				user = { ...user, ...results.data };
				user.profile.active = true;
				users[index] = user;
				// console.log("profile after => ", users[index]);
				return users;
			})
			.then((users) => {
				console.log(users);
				this.setState(users);
			});
	}

	async registerView(id) {
		let { display_name } = this.state;
		let viewed = { viewed: id };
		// console.log("viewed => ", viewed);
		await axios
			.post(`http://localhost:8002/api/views/${display_name}`, viewed)
			.then((results) => {
				console.log(results.data);
			});
		// this.props.getProfile(display_name, this.props.index);
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		await axios
			.get(`http://localhost:8002/api/search/unsorted`)
			.then((results) => {
				this.setState({
					users: results.data,
					display_name: display_name,
				});
			});
	}

	render() {
		return (
			<div>
				{console.log(this.state.users)}
				{this.state.users &&
					this.state.users.map((user, index) => (
						<div key={index}>
							{!user.profile.active ? (
								<UserCard
									index={index}
									getProfile={this.getProfile}
									registerView={this.registerView}
									user={user}
								/>
							) : (
								<ProfileCard index={index} user={user} />
							)}
						</div>
					))}
			</div>
		);
	}
}

export default Search;
