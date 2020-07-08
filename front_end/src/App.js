import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <div>
          <Header />
          <Route exact path="/" component={Home} />
		  <Route path="/Join" component={Join} />
		  <Route path="/Chat" component={Chat} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
