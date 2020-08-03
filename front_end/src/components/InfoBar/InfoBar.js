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
		// console.log(direction);
		return (
			<div className="infobar">
				<div className={`infobar-heading ${direction}`}>{heading}</div>
				<div className="infobar-value">{value}</div>
			</div>
		);
	}
}
export default InfoBar;
import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<img className="onlineIcon" src={onlineIcon} alt="online"/>
		<h3>{room}</h3>
		</div>
		<div className="rightInnerContainer">
			<a href="/"><img src={closeIcon} alt="close"/></a>
		</div>
	</div>
)

export default InfoBar
