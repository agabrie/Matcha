import React from 'react';
import './ProfileCard.css';
import { Link } from 'react-router-dom'

// function RenderInterests(props) {
//       return (
//         <div>
//           {props.interests.map((interest) => {
//             return <p key={interest}>#{interest}</p>
//           })}
//         </div>
//       )
// }

function ProfileCard(props) {
  return (
    <div>
       <div className="upper-container">
          <div className="image-container">
              
          </div>
       </div>
       <div className="lower-container">
          <div>
            <h3>{props.user.display_name}</h3>
          </div>
         {/*<img src={props.user.profile.images[0]} alt=""/>*/}
          <div className="flex-parent">
          <div className="child">
            {console.log(props)}
                  Age:  {props.user.profile.age}
              </div>
              <div className="child">
                5 km away
              </div>
          </div>
          <br/>
          <div className="flex-parent">
          <div className="child-btn">
            <button onClick={() => props.navigate("left")} className="btn-left"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            </div>
            <div className="child">
              <p>Interests:</p>
                
            </div>
            <div className="child-btn">
            <button onClick={() => props.navigate("right")} className="btn-right"><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>
          </div>
          <Link to={`/profiles/${props.user.id}`}>
            <button className="profile-btn">View profile</button>
            </Link> 
       </div>
    </div>
  ) 
}
export default ProfileCard;