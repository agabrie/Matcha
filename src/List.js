import React from "react";
// import Username from "./Username";
// import Age from "./age";
function decimalToHex(number)
{
  if (number < 0)
	number = 0xFFFFFF + number + 1;
	var hex = number.toString(16).toUpperCase();
	var len = hex.length;
	while(len < 6)
	{
		hex = '0'+hex;
		len++;
	}
  return '#'+hex;
}
function	generateColor(i)
{
	// ff99cc pink
	// cc66ff purple
	// 33ccff blue
	var baser, baseg, baseb, r, b, g;
	if(i < 0.5)
	{
		baser = 0xff;
		baseg = 0x99;
		baseb = 0xcc;
	
		r = baser - parseInt((i) * 102);
		g = baseg - parseInt((i) * 102);
		b = baseb + parseInt((i) * 102);
	}else{
		baser = 0xcc;
		baseg = 0x66;
		baseb = 0xff;
	
		r = baser - parseInt((i-0.5) * (0xcc-0x33)); //153
		g = baseg + parseInt((i-0.5) * 102);
		b = baseb + parseInt((i-0.5) * 0);
	}
	var rgb = (r<<16) | (g <<8) | b;
	// alert(this.decimalToHex(rgb));
	return(decimalToHex(rgb));
}
function	generateColorRGB(i)
{
	// ff99cc pink
	// cc66ff purple
	// 33ccff blue
	var baser, baseg, baseb, r, b, g;
	if(i < 0.5)
	{
		baser = 0xff;
		baseg = 0x99;
		baseb = 0xcc;
	
		r = baser - parseInt((i) * 102);
		g = baseg - parseInt((i) * 102);
		b = baseb + parseInt((i) * 102);
	}else{
		baser = 0xcc;
		baseg = 0x66;
		baseb = 0xff;
	
		r = baser - parseInt((i-0.5) * (0xcc-0x33)); //153
		g = baseg + parseInt((i-0.5) * 102);
		b = baseb + parseInt((i-0.5) * 0);
	}
	// var rgb = (r<<16) | (g <<8) | b;
	// alert(this.decimalToHex(rgb));
	return('rgb('+r+','+g+','+b+')');
}
function generateColorDiv(i)
{
	var base = generateColorRGB(i);
	var alpha = 'radial-gradient('+base+',red)'; 
	return(alpha);
	// return('rgb(0x'+r+',0x'+g+',0x'+b+')');
}
class Age extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props.value[0],
			color:this.props.value[1],
		};
	}
	render(){
		return(
			<div className="info age" style={{background:generateColorDiv(this.state.color)}}>
				Age :  {this.state.value}
				color: {generateColorDiv(this.state.color)}
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
class MainImage extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props.value.pp1,
		};
	}
	render(){
		return(
			<div className='info' >
				<img className="mainImage"
					src={this.state.value}
					alt={this.state.value}
				/>
				<table>
						<td><img className="info tiny"src={this.props.value.pp1} alt='' onClick={()=>this.setState({value:this.props.value.pp1})} /></td>
						<td><img className="info tiny"src={this.props.value.pp2} alt='' onClick={()=>this.setState({value:this.props.value.pp2})} /></td>
						<td><img className="info tiny"src={this.props.value.pp3} alt='' onClick={()=>this.setState({value:this.props.value.pp3})} /></td>
						<td><img className="info tiny"src={this.props.value.pp4} alt='' onClick={()=>this.setState({value:this.props.value.pp4})} /></td>
						<td><img className="info tiny"src={this.props.value.pp5} alt='' onClick={()=>this.setState({value:this.props.value.pp5})} /></td>
				</table>
			</div>
		);
	}
}
class Tags extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props,
		};
	}
	render(){
		return(
			<div className='info tags'>
			Tags :
					{this.props.value.map(tag =>(
						<div>
							<a href={'match.js?search='+tag}>{'#'+tag}</a>
						</div>
					)
					)
					}
			</div>
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
class Bio extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props,
		};
	}
	render(){
		return(
			<div className='info bio'>
			Bio :
			<p>
				{this.props.value}
			</p>
			</div>
		);
	}
}

class GenderBlob extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			value:this.props,
		};
	}
	
	render(){
		return(
			// <div className="info">
				<div className="genderblob" style={{backgroundColor:generateColor(this.props.value)}}>
					{generateColor(this.props.value)}
				</div>
			// </div> 
		);
	}
}

class List extends React.Component {
	renderDiv(type,val){
		switch(type){
			case "Username":
				return <Username value={val}/>;
			case "Age":
				return <Age value={val} />;
			case 'MainImage':
				return <MainImage value={val} />;
			case 'Gender':
				return <Gender value={val} />;
			case 'GenderBlob':
				return <GenderBlob value={val} />;
			case 'Bio':
				return <Bio value={val} />;
			case 'Tags':
				return <Tags value={val} />;
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
				"user_name":"teo.kelestura",
				"age":24,
				"gender":0.05,
				"pref":0.81,
				"images": {	pp1:require("./pics/nanana.jpg"),
							pp2:require("./pics/roses.png"),
							pp3:require("./pics/avaj_uml.jpg"),
							pp4:require("./pics/apicture.png"),
							pp5:require("./pics/kawaii_neko.png")
						},
				"gps_lat":-60.043,
				"gps_lon":-64.124,
				"tags":"nana tags aloha quay",
				"likes":"Harum corporis quis est labore consequatur totam. Possimus aut quam sed. Doloribus et aspernatur vero numquam ducimus officia. Totam reiciendis quae rerum eaque."
			}
		];
	  return(
				dun.map( dundun => (
				// this.renderDiv("Username",dundun.user_name)
				<div>
					{this.renderDiv("Username",dundun.user_name)}
					{this.renderDiv("Age",[dundun.age, dundun.gender])}
					<div className="Central">
						{this.renderDiv("MainImage",dundun.images)}
						{/* {this.renderDiv("Images",dundun.images)} */}
						{this.renderDiv("Gender",dundun.gender)}
						{this.renderDiv("GenderBlob",dundun.gender)}
						{this.renderDiv("Bio",dundun.likes)}
						{this.renderDiv("Tags",dundun.tags.split(' '))}
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