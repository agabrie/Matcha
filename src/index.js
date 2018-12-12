import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import List from './List';
class GUI extends React.Component
{
	render()
	{
		return(
			<div className='non'>
				<Header key="nani"/>
				<List key="nan"/>
			</div>
		);
	}
}

ReactDOM.render(
	<GUI />,
	document.getElementById('root')
);
// export default GUI;

/****************************************

//	ReactDOM.render(
//		<div id='suit'>
//			<h1>asdas</h1>
//			<div id='anotherone'>
//				<h2>asd</h2>
//			</div>
//		</div>,
//		document.getElementById('root')
//	);
//
//	
//	ReactDOM.render(<h1>Hello World</h1>, document.getElementById('suit'));

****************************************/


// class Square extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			value: null,
// 		};
// 	}
	
// 	render() {
// 		return (
// 			<button className="square" onClick={() => this.setState({value: 'X'})}>
// 				{this.state.value}
// 			</button>
// 		);
// 	}
// }
// 
//	class Board extends React.Component {
// 		constructor (props){
// 			super(props);
// 			this.state = {
// 				squares: Array(9).fill(null),
// 			};
// 		}
// 		renderSquare(i) {
// 		  return <Square value={i} />;
// 		}
// 		render() {
// 			const status = 'Next player: X';

// 			return (
// 			  <div>
// 				<div className="status">{status}</div>
// 				<div className="board-row">
// 				  {this.renderSquare(0)}
// 				  {this.renderSquare(1)}
// 			  {this.renderSquare(2)}
// 			</div>
// 			<div className="board-row">
// 			  {this.renderSquare(3)}
// 			  {this.renderSquare(4)}
// 			  {this.renderSquare(5)}
// 			</div>
// 			<div className="board-row">
// 			  {this.renderSquare(6)}
// 			  {this.renderSquare(7)}
// 			  {this.renderSquare(8)}
// 			</div>
// 			<br />
// 			<div className="board-row">
// 			  {this.renderSquare(9)}
// 			  {this.renderSquare(10)}
// 			  {this.renderSquare(11)}
// 			  {this.renderSquare(12)}
// 			</div>
// 			<div className="board-row">
// 			  {this.renderSquare(13)}
// 			  {this.renderSquare(14)}
// 			  {this.renderSquare(15)}
// 			  {this.renderSquare(16)}
// 			</div>
// 		  </div>
// 		);
// 	  }
// 	}

// 	class Game extends React.Component {
// 		render() {
// 		  return (
// 			<div className="game">
// 			  <div className="game-board">
// 				<Board />
// 			  </div>
// 			  <div className="game-info">
// 				<div>{/* status */}</div>
// 				<ol>{/* TODO */}</ol>
// 			  </div>
// 			</div>
// 		  );
// 		}
// 	  }
// 	  ReactDOM.render(
// 		<Game />,
// 		document.getElementById('root')
// 	);
// // 	  // ========================================
	  
