import React, { Component } from "react";
import axios from "axios";
class Image extends Component {
	constructor(props) {
		super(props)
	}
}
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
			<div>
				{console.log("here ->", this.state)}
				<div>
					<input
						accept="image/*"
						id="button"
						type="file"
						onChange={this.onChangeHandler}
					/>
					{this.state.data && (
						<div>
							<h1>{this.state.rank}</h1>
							<img
								src={`${this.state.type},${this.state.data}`}
								width="20%"
								alt=""
							/>
							<br />
							<button onClick={this.submit}>SAVE</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Picture;
