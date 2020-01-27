import React from 'react';
import './ProfileList.css';
import Profile from '../Profile/Profile';


class ProfileList extends React.Component {
    render() {
        return (
            <div className="ProfileList" >
            {
                this.props.profiles.map(profile => {
                return <Profile key={profile.id} profile={profile}/>
            })
            }
            </div>
        )
    }
}

export default ProfileList;