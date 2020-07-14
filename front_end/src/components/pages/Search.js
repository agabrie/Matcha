import React, {Component} from 'react';
import axios from 'axios';

class UserCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
            // id:props.key,
            user:props.user,
            id: props.id,
			display_name: props.display_name,
			image: props.image,
			user: props.user,
        };
        this.registerView = this.registerView.bind(this)
	}
    async registerView() {
        let { id,user } =this.state
		let viewed = { id };
		let view = await axios
			.post(
				`http://localhost:8001/api/views/${user}`,
				viewed
			)
			.then((results) => {
				console.log(results.data);
			});
	}
	render() {
		return (
            <div onClick={this.registerView}>
				{this.state.display_name}
				<img src={this.state.image} width="100vw" />
			</div>
		);
	}
}

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			display_name: null,
		};
	}
	async componentDidMount() {
		let display_name = sessionStorage.getItem("display_name");
		let users = await axios
			.get(`http://localhost:8001/api/search/unsorted`)
			.then((results) => {
				this.setState({
					users: results.data,
					display_name: display_name,
				});
			});
	}
	
	render() {
		return (
			<div>
				{this.state.users && this.state.users.map((user, index) => (
					<UserCard
                        key={user.id}
                        id={user.id}
                        // onClick={this.registerView(user.id)}
						user={this.state.display_name}
						display_name={user.display_name}
						image={`${user.type},${user.data}`}
					/>
				))}
			</div>
		);
	}
}

export default Search;