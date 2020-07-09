import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import ImageUpload from './components/pages/Picture';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/imageUpload" component={ImageUpload} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
