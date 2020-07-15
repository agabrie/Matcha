import React, { Component } from "react";
import axios from "axios";
class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// id:props.key,
			user: null,
			id: props.id,
			display_name: props.display_name,
			image: props.image,
			user: props.user,
			gender: null,
			color: { Male: "cyan", Female: "pink", null: "grey" },
		};
		// this.registerView = this.registerView.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		console.log("clicked");
		let { id, display_name, index } = this.state;
		await this.props.registerView(id);
		await this.props.getProfile(display_name, index);
	}

	// async getProfile(id) {
	// 	let users = await axios
	// 		.get(`http://localhost:8001/api/profiles/${id}`)
	// 		.then((results) => {
	// 			// this.setState({
	// 			// users: results.data,
	// 			// display_name: display_name,
	// 			// });
	// 		});
	// }
	componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState = {
			user: display_name,
		};
	}
	render() {
		return (
			<div
				onClick={this.handleClick}
				style={{ backgroundColor: this.state.color[this.state.gender] }}
			>
				{this.state.display_name}
				<p>Profile Card</p>
				<img src={this.state.image} width="100vw" />
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
			age:props.user.profile.age,
			color: { Male: "cyan", Female: "pink", null: "grey" },
		};
		this.handleClick = this.handleClick.bind(this);
		// this.registerView = this.registerView.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		console.log("clicked user");
		let { id, display_name, index } = this.state;
		await this.props.registerView(id);
		console.log("dn & index =>", display_name, index);
		await this.props.getProfile(display_name, index);
	}

	// async getProfile(id) {
	// 	let users = await axios
	// 		.get(`http://localhost:8001/api/profiles/${id}`)
	// 		.then((results) => {
	// 			// this.setState({
	// 			// users: results.data,
	// 			// display_name: display_name,
	// 			// });
	// 		});
	// }
	componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState = {
			user: display_name,
		};
	}
	render() {
		return (
			<div
				onClick={this.handleClick}
				style={{ backgroundColor: this.state.color[this.state.gender] }}
			>
				<p>{this.state.id}</p>
				<p>{this.state.display_name}</p>
				{this.state.images.map((elem,index)=>
					<img src={`${elem.type},${elem.data}`} width="100vw" />
				)}
				<p>{this.state.age}</p>
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
		let users = await axios
			.get(`http://localhost:8001/api/profiles/${display_name}`)
			.then((results) => {
				let { users } = this.state;
				console.log("users=>", users, index);
				users[index].profile = results.data;
				users[index].profile.active = true;
				this.setState(users);
				console.log("profile => ", results.data);
				// this.setState({
				// users: results.data,
				// display_name: display_name,
				// });
			});
	}

	async registerView(id) {
		let { display_name } = this.state;
		let viewed = { viewed: id };
		let view = await axios
			.post(`http://localhost:8001/api/views/${display_name}`, viewed)
			.then((results) => {
				console.log(results.data);
			});
		// this.props.getProfile(display_name, this.props.index);
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		let users = await axios
			.get(`http://localhost:8001/api/search/unsorted`)
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
						<div>
							{!user.profile.active ? (
								<UserCard
									key={index}
									index={index}
									getProfile={this.getProfile}
									registerView={this.registerView}
									user={user}
									// id={user.id}
									// gender={user.profile.gender}
									// onClick={this.registerView(user.id)}
									// user={this.state.display_name}
									// display_name={user.display_name}
									// image={`${user.type},${user.data}`}
								/>
							) : (
								// {this.state.display_name ? <img />:< img/>}
								// {this.state.users.profile && (
								<ProfileCard
										key={index}
										index={index}
										user={user}
									// handleClick={this.registerView}
									// id={user.id}
									// onClick={this.registerView(user.id)}
									// user={this.state.display_name}
									// display_name={user.display_name}
									// image={`${user.type},${user.data}`}
								/>
							)}
						</div>
					))}
			</div>
		);
	}
}

export default Search;
