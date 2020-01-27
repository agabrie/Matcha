import React from 'react';
import './ProfileList.css';
import Profile from '../Profile/Profile';


class ProfileList extends React.Component {
    render() {
        return (
            <div className="ProfileList" >
            {
                this.props.users.map(user => {
                return <Profile key={user.id} user={user}/>
            })
            }
            </div>
        )
    }
}

export default ProfileList;