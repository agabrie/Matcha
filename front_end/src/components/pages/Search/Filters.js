import React, { Component } from "react";
import Selector from "../../Selector/Selector";
import { getSearchResult} from "../../../func";

class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sexual_preference: props.user.profile.sexual_preference,
			min: 18,
			max: 68,
			age: props.user.profile.age,
			gender: props.user.profile.gender,
			location: props.user.profile.location,
			filter: "age_diff",
			order:"ASC",
			sortby: [
				{ filter: "age_diff", direction: "ASC" },
				{ filter: "gender", direction: "ASC" },
				{ filter: "fame", direction: "DESC" },
				{ filter: "distance", direction: "ASC" },
				// { filter: "sexual_preference", direction: "ASC" },
			],
		};
		this.changeHandler = this.changeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this);
	}
	changeHandler(e) {
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	
	async submitHandler() {

		let preferences = { sexual_preference: this.state.sexual_preference,age:{min:this.state.min,max:this.state.max }}
		let { age, gender, location,filter,order }= this.state
		
		let sortby = [{filter:filter,direction:order}]
		let profile = {age:age,gender:gender,location:location}
		// console.log(preferences);
		await getSearchResult({ profile,preferences,sortby })
			.then((results) => {
				this.props.search(results);
				
				//console.log(results)
			});
			
	}
	render() {
		return (
			<div className="aside">
				<div className="heading">Search filters</div>
				<label htmlFor="sexual_preference" className="tiny">
					Sexual Preference
				</label>
				<br />
				<Selector
					size="small"
					name="sexual_preference"
					text={["⚥", "♂️", "♀"]}
					values={["Both", "Male", "Female"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<br />
				<label htmlFor="max" className="tiny">
					Age
				</label>
				<br />
				<input
					type="number"
					name="min"
					min="18"
					max={this.state.max}
					defaultValue={this.state.min}
					onChange={this.changeHandler}
				/>
				to
				<input
					type="number"
					name="max"
					min={this.state.min}
					max="68"
					defaultValue={this.state.max}
					onChange={this.changeHandler}
				/>
				<br />
				<label htmlFor="filter" className="tiny">
					Sort By
				</label>
				<br />
				<Selector
					size="tiny"
					name="filter"
					text={["age diff", "fame", "distance"]}
					values={["age_diff", "fame", "distance"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<label htmlFor="order" className="tiny">
					ordered by
				</label>
				<br />
				<Selector
					size="small"
					name="order"
					text={["↑", "↓"]}
					values={["ASC", "DESC"]}
					value={this.state.sexual_preference}
					onClick={this.changeHandler}
				/>
				<button className="btnContent" onClick={this.submitHandler}>
					✓
				</button>
			</div>
		);
	}
}

export default Filters