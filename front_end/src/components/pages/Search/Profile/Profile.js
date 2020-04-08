import React from 'react';
import './Profile.css';
import SlideView from '../SlideView/SlideView';
const YEAR_IN_MS = 365.25*24*60*60*1000

class RenderInterests extends React.Component {
    render() {
      return (
        <ul>
          {this.props.interests.map((interest) => {
            return <li key={interest.tag.name}>{interest.tag.name}</li>
          })}
        </ul>
      )
    }
}

class Profile extends React.Component {

    render(){
        return (
  <div className="Profile">
  <div className="image-container">
  <SlideView images={this.props.user.profile.images}/>
  </div>
  <h2>{this.props.user.name}</h2>
  <div className="Profile-information">
    <div className="Profile-address">
      <p>{this.props.user.location}</p>
    </div>
    <div className="Profile-reviews">
      <h3>{this.props.user.profile.biography}</h3>
      <h3 className="rating">Age:  {Math.floor((Date.now() - Date.parse(this.props.user.profile.date_of_birth))/YEAR_IN_MS)}</h3>
      {this.props.user.profile.interests &&
      <div>Interests: <RenderInterests interests={this.props.user.profile.interests}/></div>
    }
    </div>
  </div>
</div>
        )
    }
}
export default Profile;