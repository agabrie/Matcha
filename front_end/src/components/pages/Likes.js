import React, { Component } from "react";
import { CenterStyle } from "./CenterStyle";
import {
	checkVerified,
	getFullProfile,
	getAllLikes,
	registerView,
	registerLikeBack,
	registerBlock,
	registerReport
} from "../../func";
import InfoBar from "../InfoBar/InfoBar";


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
		this.report = this.report.bind(this);
		this.block = this.block.bind(this);
		this.handleLikeback = this.handleLikeback.bind(this);
		this.gotoChat = this.gotoChat.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		// console.log("clicked profile");
	}
	async handleLikeback(e) {
		e.preventDefault();
		await registerLikeBack({ viewed: this.state.id,liked:true, likedback: true });
	}

	componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState = {
			user: display_name,
		};
	}
	async report() {
		let { display_name } = this.state
		await registerReport(display_name);
	}
	async block() {
		await registerBlock({ viewed: this.state.id,blocked:true });
	}
	gotoChat() {
		let inviter = sessionStorage.display_name;
		let invited = this.state.display_name;
		let room =
			invited > inviter ? `${invited}_${inviter}` : `${inviter}_${invited}`;
		return (window.location = `/chat?name=${inviter}&room=${room}`);
	}
	render() {
		const {
			display_name,
			name,
			surname,
			images,
			gender,
			age,
			biography,
			fame,
		} = this.state;
		let symbol = this.symbol[gender];
		return (
			<div className="main-container">
				<div>
					{/* <p>{this.state.id}</p> */}
					<div className="heading">{display_name}</div>
					<InfoBar type="text" heading="Name" value={`${name} ${surname}`} />
					{images.map((elem, index) => (
						<img
							key={index}
							src={`${elem.type},${elem.data}`}
							width="20%"
							alt=""
						/>
					))}
					<div>
						<div style={CenterStyle(0)}>
							<InfoBar type="textarea" heading="age" value={age} />
							<InfoBar type="textarea" heading="gender" value={symbol} />
						</div>
						{/* <button className="btn mr-20" onClick={this.gotoChat}>
							Message
						</button> */}
						<button className="btn pl-20" onClick={this.handleLikeback}>
							Like
						</button>
						<InfoBar type="textarea" heading="Biography" value={biography} />
						<InfoBar type="bar" heading="Fame Rating" value={fame} />
					</div>
					<button className="btnImage" onClick={this.report}>report</button>
					<button className="btnImage" onClick={this.block}>block</button>
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
		// console.log("clicked user");
		let check = await checkVerified();
		if (check) return (window.location = check);
		let { id, display_name, index } = this.state;
		await this.props.registerView(id);

		await this.props.getProfile(display_name, index);
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
					<div>
						<div style={CenterStyle(0)}>
					{images.map((elem, index) => (
						<img
							// className="imgupload"
							key={index}
							src={`${elem.type},${elem.data}`}
							width="50vw"
							height="50vw"
							alt=""
						/>
					))}
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



class Likes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			display_name: null,
		};
		this.clickView = this.clickView.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.search = this.search.bind(this);
	}
	async getProfile(display_name, index) {
		let { users } = this.state;
		await getFullProfile(users, display_name, index).then((users) => {
			this.setState(users);
		});
	}

	async clickView(id) {
		let viewed = { viewed: id };
		console.log("viewed!",viewed)
		await registerView(viewed).then((results) => {
			console.log(results.data);
		});
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		await getAllLikes().then((results) => {
			this.setState({
				users: results,
				display_name: display_name,
			});
			console.log("all likes ->",results);
		});
	}
	search(users) {
		this.setState({ users: users });
	}
	render() {
		const { users } = this.state;
		return (
			<div>
				{/* {sessionStorage.id && <Filters search={this.search} />} */}
				{users &&
					users.map((user, index) => (
						<div key={user.id}>
							{!user.profile.active ? (
								<UserCard
									index={user.id}
									getProfile={this.getProfile}
									registerView={this.clickView}
									user={user}
								/>
							) : (
								<ProfileCard index={user.id} user={user} />
							)}
						</div>
					))}
			</div>
		);
	}
}

export default Likes;
