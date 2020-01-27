import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProfileList from './components/ProfileList/ProfileList';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        profiles: [
            {id: 1,
            name: "Tiger",
            location: "here",
            biography: "I am a tiger",
            date_of_birth: "22 April 1989",
            images: "http://azdan.com.sa/images/portfolio/980312.jpg",
            interests: "I eat people"
        },
        {id: 2,
            name: "Moon",
            location: "here",
            biography: "I am the moon",
            date_of_birth: "22 April 1989",
            images: "https://upload.wikimedia.org/wikipedia/commons/3/38/Sib_Tiger.jpg",
            interests: "I only come out at night"
        },
        {id: 3,
            name: "Minion",
            location: "here",
            biography: "Ka am a minion",
            date_of_birth: "22 April 1989",
            images: "https://upload.wikimedia.org/wikipedia/commons/0/06/Makari_the_Tiger.jpg",
            interests: "Ka solo po kapee ka nokka"
        },
        ]
    };
    
}
  
 
  render() {
  return (
    <div className="App">
    <h1>Matcha</h1>
    <ProfileList profiles={this.state.profiles}/>
  </div>)
 }
}

export default App;
