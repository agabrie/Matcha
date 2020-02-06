import React from 'react';
import './ProfileList.css';
import Profile from '../Profile/Profile';


class ProfileList extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="ProfileList" >
            {
                this.props.users.map(user => {
                return <Profile key={user} user={user}/>
            })
            }
            </div>
        )
    }
}

export default ProfileList;