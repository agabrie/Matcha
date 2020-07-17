import React, { Component } from "react";
import axios from "axios";
import CenterStyle from "./CenterStyle";
class Picture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rank: this.props.rank,
			type: this.props.file ? this.props.file.type : null,
			data: this.props.file ? this.props.file.data : null,
			uploaded: this.props.src ? true : false,
			visibility: false,
			display_name: this.props.display_name,
		};
	}
	resetState = () => {
		this.setState({
			visibility: false,
		});
	};
	onChangeHandler = (event) => {
		// this.resetState();
		var file = event.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			let base64 = reader.result;
			let data = base64.split(",");
			this.setState({
				data: data[1],
				type: data[0],
				visibility: true,
			});
		};
	};
	submit = async () => {
		var { data, display_name, rank, type } = this.state;
		let img = { data: data, rank: rank, type: type };
		console.log("submit img", img);
		let url = `http://localhost:8001/api/images/${display_name}`;
		console.log(url);
		let result = await axios.post(url, img);
		console.log(result);
	};

	render() {
		return (
			<div
				style={{
					backgroundColor: "darkgrey",
					borderRadius: "10px",
					padding: "5px",
					margin: "1px",
					width: "20vw",
					height: "30vw",
				}}
			>
				<div style={{"fontSize":"2vw"}}>{this.state.rank == 1 ? "Profile Pic" : this.state.rank}</div>
				<div>
					<label
						htmlFor={`button${this.state.rank}`}
					>
						{this.state.data ? (
							<div>
								<img
									src={`${this.state.type},${this.state.data}`}
									style={{
										height: "19vw",
										width: "19vw",
									}}
									alt=""
								/>
								<button onClick={this.submit}>SAVE</button>
							</div>
						) : (
							<div style={{ fontSize: "19vw", height: "19vw", width: "19vw",margin:0 }}>
								+
							</div>
						)}
					</label>
					<input
						accept="image/*"
						id={`button${this.state.rank}`}
						type="file"
						onChange={this.onChangeHandler}
						hidden
					/>
				</div>
			</div>
		);
	}
}
export default Picture;
