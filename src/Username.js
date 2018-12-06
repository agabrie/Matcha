import React from "react";

class Username extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props,
		};
	}
	render(){
		return(
			<div className="info">
				Username : {this.props.value}
			</div>
		);
	}
}
export default Username;