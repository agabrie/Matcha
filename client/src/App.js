import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProfileList from './components/ProfileList/ProfileList';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users : [
        {
            "_id": "5dfa345028bcffb177566935",
            "name": "Keziah",
            "surname": "Heynes",
            "email": "kheynes@student.wethinkcode.co.za",
            "display_name": "kheynes",
            "password": "asdASDASD123",
            "__v": 0,
            "profile": {
                "location": {
                    "type": "Point"
                },
                "sexual_preference": [
                    "Male"
                ],
                "_id": "5e203efce255bd8a19e8aa07",
                "images": ["http://azdan.com.sa/images/portfolio/980312.jpg", 
                "https://upload.wikimedia.org/wikipedia/commons/3/38/Sib_Tiger.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/0/06/Makari_the_Tiger.jpg"
              ],
                "interests": ["goats", "ham", "stalactites"],
                "views": [],
                "gender": "Female",
                "biography": "I am a tree"
            }
        },
        {
            "_id": "5e0ee7a5e5a6df685d316f46",
            "name": "Abduraghmaan",
            "surname": "Gabriels",
            "email": "agabrie@student.wethinkcode.co.za",
            "display_name": "agabrie",
            "password": "asdASDASD123",
            "__v": 0,
            "profile": {
                "location": {
                    "type": "Point"
                },
                "sexual_preference": [
                    "Female"
                ],
                "_id": "5e27dec67596886f6ba2ea42",
                "images": ["http://azdan.com.sa/images/portfolio/980312.jpg", 
                "https://upload.wikimedia.org/wikipedia/commons/3/38/Sib_Tiger.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/0/06/Makari_the_Tiger.jpg"
              ],
                "interests": ["pizza", "turtles", "ninjas"],
                "views": [],
                "gender": "Male",
                "biography": "I am straight",
                "date_of_birth": "1998-04-20T00:00:00.000Z"
            }
        },
        {
            "_id": "5e0ee835e5a6df685d316f47",
            "name": "Matthew",
            "surname": "Gerber",
            "email": "magerber@student.wethinkcode.co.za",
            "display_name": "magerber",
            "password": "qwer1234",
            "__v": 0,
            "profile": {
                "location": {
                    "type": "Point"
                },
                "sexual_preference": [],
                "_id": "5e2ab4d9d2406f44d4762435",
                "images": ["http://azdan.com.sa/images/portfolio/980312.jpg", 
                "https://upload.wikimedia.org/wikipedia/commons/3/38/Sib_Tiger.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/0/06/Makari_the_Tiger.jpg"
              ],
                "interests": ["shuffleboard", "quidditch"],
                "views": [],
                "biography": "Please like me"
            }
        }
    ]
    };
    
}
  
 
  render() {
  return (
    <div className="App">
    <h1>Matcha</h1>
    <ProfileList users={this.state.users}/>
  </div>)
 }
}

export default App;
