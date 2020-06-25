import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import ProfileCarousel from './components/ProfileCarousel/ProfileCarousel';
import ProfileView from './components/ProfileView/ProfileView';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/ProfileCarousel" component={ProfileCarousel}/>
          <Route path="/profiles/:id" component={ProfileView}/>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
