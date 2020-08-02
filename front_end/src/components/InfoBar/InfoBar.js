import React, { Component } from "react";
import './InfoBar.scss';
class InfoBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			heading: this.props.heading,
			type: this.props.type,
			value: this.props.value,
		};
		this.detail = {
			text: "detail-right",
			textarea: "detail-bottom",
		};
	}
	render() {
		const { heading, type, value } = this.state;
		let direction = this.detail[type];
		console.log(direction);
		return (
			<div className="infobar">
				<div className={`infobar-heading ${direction}`}>{heading}</div>
				<div className="infobar-value">{value}</div>
			</div>
		);
	}
}
export default InfoBar;
