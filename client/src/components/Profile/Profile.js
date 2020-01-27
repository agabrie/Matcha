import React from 'react';
import './Profile.css';
import SlideView from '../SlideView/SlideView';



class Profile extends React.Component {
    render(){
        return (
  <div className="Profile">
  <div className="image-container">
  <SlideView images={this.props.profile.images}/>
  </div>
  <h2>{this.props.profile.name}</h2>
  <div className="Profile-information">
    <div className="Profile-address">
      <p>{this.props.profile.location}</p>
    </div>
    <div className="Profile-reviews">
      <h3>{this.props.profile.biography}</h3>
      <h3 className="rating">born {this.props.profile.date_of_birth}</h3>
      <p>Interests: {this.props.profile.interests}</p>
    </div>
  </div>
</div>
        )
    }
}
export default Profile;