import React, { Component } from "react";
import Picture from "./Picture";
import { getAllUserImages } from "../../func";
import { CenterStyle } from "./CenterStyle";
import "./Picture.css";

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display_name: "",
			rank: null,
		};
	}

	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");

		let images = [];
		console.log(display_name)
		let res = await getAllUserImages(display_name);
		console.log(res);
		res.forEach((elem) => {
			images[elem.rank] = { data: elem.data, type: elem.type };
		});

		this.setState({
			data: images,
			display_name: display_name,
		});
	}
	render() {
		return (
			<div>
				<div className="text">{this.state.display_name}</div>
				{this.state.data && (
					<div style={CenterStyle(0)}>
						<Picture
							rank="1"
							display_name={this.state.display_name}
							file={this.state.data[1]}
						/>
					</div>
				)}
				<div className="centerStyle">
					{this.state.data && (
						<div className="secondary">
							<Picture
								rank="2"
								display_name={this.state.display_name}
								file={this.state.data[2]}
							/>
							<Picture
								rank="3"
								display_name={this.state.display_name}
								file={this.state.data[3]}
							/>
							<Picture
								rank="4"
								display_name={this.state.display_name}
								file={this.state.data[4]}
							/>
							<Picture
								rank="5"
								display_name={this.state.display_name}
								file={this.state.data[5]}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default ImageUpload;
