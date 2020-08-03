import React, { Component } from "react";
import './Selector.scss';

class Selector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			values: this.props.values ? this.props.values : [],
			text: this.props.text ? this.props.text : this.props.values,
			// colors: this.props.colors ? this.props.colors : [],
			images: this.props.images ? this.props.images : [],
			selected: '0',
			size: this.props.size
		};
		this.onClickHandler = this.onClickHandler.bind(this);
		this.onClick = this.props.onClick;
	}
	onClickHandler(e) {
		e.target.value = e.target.getAttribute("value");
		e.target.name = this.state.name;
		this.setState({
			selected: e.target.getAttribute("index"),
		});
		this.onClick(e);
	}
	render() {
		const { text, selected, values,size } = this.state;
		return (
			<div>
				{text.map((option, index) => (
					<div
						theme="purple"
						key={index}
						index={index}
						// data-color={this.state.colors[index]}
						className={`${
							// eslint-disable-next-line
							selected == index ? "selector selected" : "selector"} ${size}`
						}
						value={values[index]}
						onClick={this.onClickHandler}
						// disabled
					>
						{option}
						{/* {this.state.images[index] && <div><br /><img alt='' src={this.state.images[index]} style={{ width: "4vw", height: "4vw" }}/></div>} */}
					</div>
				))}
			</div>
		);
	}
}
export default Selector;