import React from "react";
// import Username from "./Username";
// import Age from "./age";

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
			<div className="info age">
				Age :  {this.props.value}
			</div>
		);
	}
}
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
			<div className="info username">
				Username : {this.props.value}
			</div>
		);
	}
}
class PP extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props,
		};
	}
	render(){
		return(
			<img className="info pp"
				src={this.props.value}
				alt=''
			/>
		);
	}
}
class Gender extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props,
		};
	}
	render(){
		return(
			<progress className="info gender"
				value={this.props.value}
				max='1'
			></progress>
		);
	}
}
class List extends React.Component {
	renderDiv(type,val)
		{
			switch(type){
				case "Username":
					return <Username value={val} />;
				case "Age":
					return <Age value={val} />;
				case 'PP':
					return <PP value={val} />;
				case 'Gender':
					return <Gender value={val} />;
				default:
					break;
			}
		}
	render() {
	  // var users = [
		// { firstname: "Abduraghmaan", surname: "Gabriels", username:"agabrie", age:"20"}
		// ];
		var dun = [
			{
				"user_name":"antonina.brown",
				"age":38,
				"gender":0.3,
				"pref":0.81,
				"pp":require('./nanana.jpg'),
				"gps_lat":-60.043,
				"gps_lon":-64.124,
				"likes":"Harum corporis quis est labore consequatur totam. Possimus aut quam sed. Doloribus et aspernatur vero numquam ducimus officia. Totam reiciendis quae rerum eaque."
			}
			// 4.675680253925442,
			// null,
			// 0,
			// 6092.92,
			// 0
		];
		
	  return(
				dun.map( dundun => (
				// this.renderDiv("Username",dundun.user_name)
				<div>
					{this.renderDiv("Username",dundun.user_name)}
					{this.renderDiv("Age",dundun.age)}
					<div className="Central">
						{this.renderDiv("PP",dundun.pp)}
						{this.renderDiv("Gender",dundun.gender)}
					</div>
				</div>
				// <div>{dundun.user_name} </div>
				// <div>{dundun.age} </div>
  			// <div className="age">{dundun.age}</div>
  			// <div className="gender">{user.username}</div>
  			// <div className="preference">{user.username}</div>
  			// <div className="fame">{user.username}</div>
  			// <div className="bio">{user.username}</div>
				))
		);
	}
  }
  
	export default List;
	
	// return (
	// 	<ul>
	// 	  {countries.map(country => (
	// 			<li>
	// 		  "Capital of {country.name} is {country.capital}";
	// 			</li>
	// 	  ))}
	// 	</ul>
	//   );