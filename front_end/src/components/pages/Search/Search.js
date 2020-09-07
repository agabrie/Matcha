import React, { Component } from "react";
import Filters from "./Filters"
import ProfileCard from "./ProfileCard"
import UserCard from "./UserCard"
import { getFullProfile, registerView, isVerified, getUnsortedSearchResults, getFullLoggedProfile} from "../../../func";
import io from 'socket.io-client';
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			display_name: null, 
			userProfile: null
		};
		this.clickView = this.clickView.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.search = this.search.bind(this);
	}
	async getProfile(display_name,index) {
		let { users } = this.state;
		await getFullProfile(users,display_name,index).then((users) => {
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
		 console.log("sesh", sessionStorage)
		const ENDPOINT = 'localhost:4001';
		let socket = io(ENDPOINT)
		socket.on('message', (message) => {
			sessionStorage.setItem('newMessage', message.text);
			sessionStorage.setItem('newMessageSender', message.user);
		})
		console.log("sesh storage", sessionStorage)
		let verified = await isVerified()
		if (!verified) {
			this.setState({error:"please verify your account"})
		}
		let display_name = sessionStorage.getItem("display_name");
		await getUnsortedSearchResults()
			.then((results) => {
				this.setState({
					users: results,
					display_name: display_name,
				});
			});
		
		await getFullLoggedProfile(display_name).then((res) => {
			if (res.profile)
				this.setState({userProfile:res})
		})

	}
	search(users) {
		this.setState({users:users})
	}
	render() {
		const { users,error } = this.state
		return (
			<div>
				{sessionStorage.id && this.state.userProfile && <Filters search={this.search} user={this.state.userProfile} />}
				{users &&
					users.map((user, index) => (
						<div key={user.id}>
							{error && <div className="main-container" style={{ color: "red" }}>{error}</div>}

							{!user.profile.active ? (
								<UserCard
									index={user.id}
									getProfile={this.getProfile}
									registerView={this.clickView}
									user={user}
								/>
							) : (
								<ProfileCard index={user.id} loggedUser={this.state.userProfile.profile} user={user}/>
							)}
						</div>
					))}
			</div>
		);
	}
}

export default Search;
