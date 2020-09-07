import React, { Component } from "react";
import { Link } from 'react-router-dom';
import InfoBar from "../../InfoBar/InfoBar";
import AlertMessage from "../../Alert/alert"
import { CenterStyle } from "../CenterStyle";
import { getAllLikes, checkMatch,  unLike, updateFame, registerLike, getAllMatches, findDistance} from "../../../func";

class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			message:"",
			matched: false,
			likedUser: false,
			index: props.index,
			user: props.user,
			id: props.user.id,
			display_name: props.user.display_name,
			name: props.user.name,
			surname: props.user.surname,
			gender: props.user.profile.gender,
			sexual_preference: props.user.profile.sexual_preference, 
			age: props.user.profile.age,
			images: props.user.images,
			biography: props.user.profile.biography,
			location: props.user.profile.location, 
			date_of_birth: props.user.profile.date_of_birth,
			fame: props.user.profile.fame,
			distance: 0,
			symbol: { Male: "♂️", Female: "♀" },
			color: { Male: "cyan", Female: "pink", null: "grey" },
		};
		this.symbol = { Male: "♂️", Female: "♀" };
		this.handleClick = this.handleClick.bind(this);
		this.gotoChat = this.gotoChat.bind(this);
		this.checkIfMatched = this.checkIfMatched.bind(this)
		this.checkIfLiked = this.checkIfLiked.bind(this)
		// this.registerView = this.registerView.bind(this);
	}
	async handleClick(e) {
		e.preventDefault();
		console.log("clicked profile");
	}

	toggleShow = () => {
        this.setState(prevState => {
            return{
                ...prevState,
				show: !prevState.show,
            }
        })
	}
	
	async handleLike (e) {
		let fullProfile = {display_name: this.state.display_name,
			gender: this.state.gender, 
			sexual_preference: this.state.sexual_preference, 
			biography: this.state.biography, 
		//	location: this.state.location, 
			date_of_birth: this.state.date_of_birth, 
			fame: this.state.fame}
		let newFame = this.state.fame
		await getAllLikes(this.state.display_name)
		.then(res => {
			let likedAlready = checkMatch(res, sessionStorage.display_name)
			if (likedAlready === true){
				unLike(this.state.id, this.state.display_name)
				updateFame(fullProfile, 'unlike')
				newFame = newFame - 10
				if(this.state.matched === true){
					updateFame(fullProfile, 'unmatch')
					newFame = newFame - 100
					this.setState({matched:false})
				}
				this.setState({fame:newFame,
					likedUser: false})
			} else {
				registerLike(this.state.id, this.state.display_name)
				updateFame(fullProfile, 'like')
				newFame = newFame + 10
				if(this.state.likedUser === true){
					updateFame(fullProfile, 'match')
					newFame = newFame + 100
					this.setState({matched:true})
					this.setState({message:`You have matched with ${this.state.display_name}!`})
					this.toggleShow()
				}
				this.setState({fame:newFame, likedUser:true})
			}
		})
	}

	async checkIfMatched(){
		await getAllMatches(this.state.display_name)
		.then(matches => {
			let i = 0
			while(matches[i]){
				if(matches[i].display_name === sessionStorage.display_name){
					this.setState({matched:true})
				}
				i++
			}
		})
	}

	async checkIfLiked(){
		await getAllLikes(sessionStorage.display_name)
		.then(likes => {
			let i = 0
			while(likes[i]){
				if(likes[i].display_name === this.state.display_name){
					this.setState({likedUser:true})
				}
				i++
			}
		})
	}

	addView = () => {
		let fullProfile = {display_name: this.state.display_name,
			gender: this.state.gender, 
			sexual_preference: this.state.sexual_preference, 
			biography: this.state.biography, 
			location: this.state.location, 
			date_of_birth: this.state.date_of_birth, 
			fame: this.state.fame}
		updateFame(fullProfile, 'view')
		this.setState(prevState => {
			return{
				...prevState,
				fame: prevState.fame + 5
			}
		})

	}

	distance = () => {
		let dist = findDistance(this.state.location.x, this.props.loggedUser.location.y, this.props.loggedUser.location.x, this.state.location.y)
		console.log("distance found", dist)
		this.setState({distance:dist})
	}

	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		this.setState({
			user: display_name,
		}) 
		this.checkIfMatched()
		this.checkIfLiked()
		this.addView()
		this.distance()

	}
	gotoChat() {
		let inviter = sessionStorage.display_name;
		let invited = this.state.display_name;
		let room =
			invited > inviter ? `${invited}_${inviter}` : `${inviter}_${invited}`;
		return window.location = (`/chat?name=${inviter}&room=${room}`);
	}
	render() {
		const { display_name, name, surname, images, gender, age, biography, fame, distance } = this.state;
		let symbol = this.symbol[gender];
		return (
			<div className="main-container">
				<div>
					{/* <p>{this.state.id}</p> */}
					<div className="heading">{display_name}</div>
					<InfoBar
						type="text"
						heading="Name"
						value={`${name} ${surname}`}
					/>
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
							<InfoBar type="textarea" heading="location" value={`${distance} km away`} />
						</div>				
						<button id="like" className="btn pl-20" onClick={() => this.handleLike()} >{this.state.likedUser ? "Unlike" : "Like"}</button>
						<AlertMessage show={this.state.show} toggleShow={this.toggleShow} message={this.state.message}/>
						<InfoBar type="textarea" heading="Biography" value={biography} />
						<InfoBar type="bar" heading="Fame Rating" value={fame} />
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCard