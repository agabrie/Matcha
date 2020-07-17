import React from 'react';
import './App.scss';
import { Login, Register } from './components/login/index';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isLogginActive: true,
		}
	}

	changeState() {
		const { isLogginActive }  = this.state;
		if(isLogginActive) {
			this.Side.classList.remove("right");
			this.Side.classList.add("left");
		} else {
			this.Side.classList.remove("left");
			this.Side.classList.add("right");			
		}

		this.setState((prevState) => ({ isLogginActive: !prevState.isLogginActive}))
	}

	render() {
		const { isLogginActive } = this.state;
		const current = isLogginActive ? "Register" : "Login";
		return (
			<div className="App">
				<div className="login">
					<div className="container">
						{ isLogginActive && <Login containerRef={ (ref) => this.current = ref } /> }
						{ !isLogginActive && <Register containerRef={ (ref) => this.current = ref } /> }
					</div>
					<Side current={ current } containerRef={(ref) => this.Side = ref } onClick={ this.changeState.bind(this) }/>
				</div>
			</div>
		)
	}
}

const Side = props => {
	return(
		<div className="side" ref={ props.containerRef } onClick={ props.onClick }>
			<div className="inner-container">
				<div className="text">{ props.current }</div>
			</div>
		</div>
	)
}

export default App;
