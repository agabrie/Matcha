import React, { Component } from "react";
// import axios from "axios";
import { CenterStyle } from "./CenterStyle";
import { getFullLoggedProfile,checkVerified,getFullProfile,getSearchResult,getUnsortedSearchResults,registerView } from "../../func";
import InfoBar from "../InfoBar/InfoBar";
import Selector from "../Selector/Selector";

class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sexual_preference: this.props.sexual_preference,
			min: 18,
			max: 68,
			age: this.props.age,
			gender: this.props.gender,
			location: this.props.location,
			filter: "age_diff",
			order:"ASC",
			sortby: [
				{ filter: "age_diff", direction: "ASC" },
				{ filter: "gender", direction: "ASC" },
				{ filter: "fame", direction: "DESC" },
				{ filter: "age", direction: "ASC" },
				// { filter: "sexual_preference", direction: "ASC" },
			],
		};
		this.changeHandler = this.changeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this);
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	async componentDidMount() {
		await getFullLoggedProfile().then((res) => {
			// console.log("res",res.profile);
			if (res.profile)
				this.setState({age:res.profile.age,gender:res.profile.gender,sexual_preference:res.profile.sexual_preference,location:res.profile.location})
		})
	}
	async submitHandler() {
		// console.log(this.props);
		let preferences = { sexual_preference: this.state.sexual_preference,age:{min:this.state.min,max:this.state.max }}
		let { age, gender, location,filter,order }= this.state
		let sortby = [{filter:filter,direction:order}]
		let profile = {age:age,gender:gender,location:location}
		// console.log(preferences);
		await getSearchResult({ profile,preferences,sortby })
			.then((results) => {
				this.props.search(results);
			});
	}
	render() {
		return (
			<div className="aside">
				<div className="heading">Search filters</div>
				<label htmlFor="sexual_preference" className="tiny">
					Sexual Preference
				</label>
				<br />
				<Selector
					size="small"
					name="sexual_preference"
					text={["⚥", "♂️", "♀"]}
					values={["Both", "Male", "Female"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<br />
				<label htmlFor="max" className="tiny">
					Age
				</label>
				<br />
				<input
					type="number"
					name="min"
					min="18"
					max={this.state.max}
					defaultValue={this.state.min}
					onChange={this.changeHandler}
				/>
				to
				<input
					type="number"
					name="max"
					min={this.state.min}
					max="68"
					defaultValue={this.state.max}
					onChange={this.changeHandler}
				/>
				<br />
				<label htmlFor="filter" className="tiny">
					Sort By
				</label>
				<br />
				<Selector
					size="tiny"
					name="filter"
					text={["age diff", "fame", "age", "gender"]}
					values={["age_diff", "fame", "age", "gender"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<label htmlFor="order" className="tiny">
					ordered by
				</label>
				<br />
				<Selector
					size="small"
					name="order"
					text={["↑", "↓"]}
					values={["ASC", "DESC"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<button className="btnContent" onClick={this.submitHandler}>
					✓
				</button>
			</div>
		);
	}
}
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
		// console.log("clicked user");
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
			display_name: null
		};
		this.clickView = this.clickView.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.search = this.search.bind(this);
	}
	async getProfile(display_name,index) {
		let { users } = this.state;
		await getFullProfile(users,display_name,index).then((users) => {
			// console.log(users);
			this.setState(users);
		});
	}

	async clickView(id) {
		// let { display_name } = this.state;
		let viewed = { viewed: id };
		// console.log("viewed => ", viewed);
		await registerView(viewed)
			.then((results) => {
				// console.log(results.data);
			});
		// this.props.getProfile(display_name, this.props.index);
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		await getUnsortedSearchResults()
			.then((results) => {
				this.setState({
					users: results,
					display_name: display_name,
				});
			});
	}
	search(users) {
		this.setState({users:users})
	}
	render() {
		const { users } = this.state
		return (
			<div>
				{sessionStorage.id && <Filters search={this.search} />}
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

export default Search;
