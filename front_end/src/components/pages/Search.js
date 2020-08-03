import React, { Component } from "react";
// import axios from "axios";
import { CenterStyle } from "./CenterStyle";
import { checkVerified,getFullProfile,getSearchResult,registerView } from "../../func";
import InfoBar from "../InfoBar/InfoBar";
import { Link } from 'react-router-dom';

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
			symbol: { Male: "♂️", Female: "♀" },
			color: { Male: "cyan", Female: "pink", null: "grey" },
		};
		this.symbol = { Male: "♂️", Female: "♀" };
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
		const { display_name, name, surname, images, gender, age, biography, fame } = this.state;
		let symbol = this.symbol[gender];
		return (
			<div className="main-container">
				<div>
					{/* <p>{this.state.id}</p> */}
					<div className="heading">{display_name}</div>
					<InfoBar
						type="text"
						heading="Full Name"
						value={`${name} ${surname}`}
					/>
					{images.map((elem, index) => (
						<img
							key={index}
							src={`${elem.type},${elem.data}`}
							width="100vw"
							alt=""
						/>
					))}
					<div>
						<div style={CenterStyle(0)}>
							<InfoBar type="textarea" heading="age" value={age} />
							<InfoBar type="textarea" heading="gender" value={symbol} />
							<Link  to={`/chat?name=${sessionStorage.getItem("display_name")}&room=${display_name > sessionStorage.getItem("display_name") ? display_name : sessionStorage.getItem("display_name")}`}>
								<button className="button mt-20">Message</button>
							</Link>
						</div>

						<InfoBar type="textarea" heading="Biography" value={biography} />
						<InfoBar type="bar" heading="Fame Rating" value={fame} />
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
		this.symbol = { Male: "♂️", Female: "♀" };
			this.handleClick = this.handleClick.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		console.log("clicked user");
		let check = await checkVerified();
		if (check)
			return (window.location = check)
		let { id, display_name, index } = this.state;
		await this.props.registerView(id);
		
		await this.props.getProfile( display_name,index);
	}

	componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState = {
			user: display_name,
		};
	}
	render() {
		const { display_name, images, age, gender } = this.state;
		let symbol = this.symbol[gender];
		return (
			<div className="main-container" onClick={this.handleClick}>
				<div>
					<div className="heading">{display_name}</div>
					{images.map((elem, index) => (
						<img
							key={index}
							src={`${elem.type},${elem.data}`}
							width="100vw"
							alt=""
						/>
					))}
					<div>
						<div style={CenterStyle(0)}>
						<InfoBar type="textarea" heading="age" value={age} />
						<InfoBar type="textarea" heading="gender" value={symbol} />
						</div>
						{"click to expand"}
						<div className="hovering-symbol small">▼</div>
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
		this.clickView = this.clickView.bind(this);
		this.getProfile = this.getProfile.bind(this);
	}
	async getProfile(display_name,index) {
		let { users } = this.state;
		await getFullProfile(users,display_name,index).then((users) => {
			console.log(users);
			this.setState(users);
		});
	}

	async clickView(id) {
		// let { display_name } = this.state;
		let viewed = { viewed: id };
		// console.log("viewed => ", viewed);
		await registerView(viewed)
			.then((results) => {
				console.log(results.data);
			});
		// this.props.getProfile(display_name, this.props.index);
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		await getSearchResult()
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
									registerView={this.clickView}
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
