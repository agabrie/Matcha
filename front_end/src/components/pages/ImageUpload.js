import React, { Component } from 'react';
import axios from 'axios';
import Picture from './Picture';
class ImageUpload extends Component {
	constructor(props) {
		super(props)
		this.state = { display_name: '', rank: null }
	}
	getAllUserImages = async () => {
		let results = await axios.get(`http://localhost:8001/api/images/${this.state.display_name}`)
		.then(res => {
			// console.log("res =>", res);
			return res.data
		})
		// console.log(results)
		return results;
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem('display_name');
		this.setState({ display_name: display_name })
		let results = await axios.get(`http://localhost:8001/api/images/${display_name}`)
		.then(res => {
			return res.data
		})
		console.log("results : ",results)
		let image = []
		results.forEach(elem => {
			image[elem.rank] = { data: elem.data, type: elem.type }
		})
		
		this.setState({
			data: image,
		})
	}
	render() {
		return (<div>
			<h1>{this.state.display_name}</h1>
			{this.state.data &&
				<div>
					<Picture rank='1' display_name={this.state.display_name} file={this.state.data[1]} />
					<Picture rank='2' display_name={this.state.display_name} file={this.state.data[2]} />
					<Picture rank='3' display_name={this.state.display_name} file={this.state.data[3]} />
					<Picture rank='4' display_name={this.state.display_name} file={this.state.data[4]} />
					<Picture rank='5' display_name={this.state.display_name} file={this.state.data[5]} />
				</div>
			}
		</div>)
	}
}
export default ImageUpload;