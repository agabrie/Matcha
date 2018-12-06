import React from "react";

class Age extends React.Component
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
				Age :  {this.props.value}
			</div>
		);
	}
}
export default Age;