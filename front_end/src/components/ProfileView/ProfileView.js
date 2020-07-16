import React, { useState, useEffect} from 'react';
import './ProfileView.css';
import SlideView from '../SlideView/SlideView';
import axios from 'axios';

function ProfileView({match}) {
    useEffect(() => {
        async function fetchProfile (){ 
            const response = await axios.get(`http://localhost:8001/api/profiles/${match.params.id}`)
            console.log(response)
            setName(response.data.display_name)
            setProfile(response.data.profile)
        }
        fetchProfile()
    }, [match])

    const [userProfile, setProfile] = useState({})
    const [name, setName] = useState("")
    return (
        
        <div className="profileView-container">
            <div className="column">
                <div className="row">
                    <div className="column">
                        <div className="left-panel">
                            <h2>{name ? name : null}</h2>
                        </div>
                    </div>
                    <div className="column">
                        <div className="images">
                            {userProfile.images ?  <SlideView images={userProfile.images}/> : null}
                        </div>
                    </div>
                    <div className="column">
                        <div className="right-panel">
                            <h3>   </h3>
                            <button name="like-btn"><i className="fa fa-heart" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="details">
                        <h3>Biography</h3> 
                        <p>{userProfile.biography}</p>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ProfileView