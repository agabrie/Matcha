import React, { Component } from "react";
import { deleteImage, uploadImage } from "../../func";
import "./Picture.scss"

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
		let result = await uploadImage(this.state);
		console.log(result)
	};
	
	delete = async () => {
		let result = await deleteImage(this.state).then(res => {
			this.setState({ data: null,type:null});
		})
		console.log(result);
	 }
	render() {
		return (
			<div className="imgcontainer">
				<div className="text small">
					{this.state.rank === '1' ? "Profile Pic" : this.state.rank}
				</div>
				<div>
					<label htmlFor={`button${this.state.rank}`}>
						{this.state.data ? (
							<div>
								<div>
									<img
										className="imgupload"
										src={`${this.state.type},${this.state.data}`}
										style={{
											height: "19vw",
											width: "19vw",
										}}
										alt=""
									/>
								</div>
								<button className="btnImage" onClick={this.submit}>
									✓
								</button>
								<button className="btnImage" onClick={this.delete}>
									🛇
								</button>
							</div>
						) : (
							<div className="no-image">☺</div>
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
