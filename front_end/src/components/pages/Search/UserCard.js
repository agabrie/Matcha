import React, { Component } from "react";
import InfoBar from "../../InfoBar/InfoBar";
import { CenterStyle } from "../CenterStyle";
import { checkVerified} from "../../../func";

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
			<div className="main-container" id="view" onClick={this.handleClick}>
				<div>
					<div className="heading">{display_name}</div>
					{images.map((elem, index) => (
						<img className="imgupload"
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

export default UserCard