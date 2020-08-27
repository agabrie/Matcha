import React, { useState, useEffect} from 'react';
import './ProfileView.css';
import SlideView from '../SlideView/SlideView';
import axios from 'axios';
import { checkVerified} from '../../func'

function ProfileView({match}) {
    useEffect(() => {
        async function fetchProfile() {
            console.log("user -> ",match.params.id)
            const profile = await axios.get(`http://localhost:8002/api/profiles/${match.params.id}/all`)
            const images = await axios.get(
                `http://localhost:8002/api/images/${match.params.id}`
            );
            console.log(profile)
            console.log(images);
            setImages(images.data.images);
            console.log("images =>",images.data)
            setUser(profile.data)
            setProfile(profile.data.profile)
		}
		async function getVerified() {
			let check = await checkVerified();
			console.log("check", check);
			if (check)
			return (window.location = check)
		}
		fetchProfile()
		getVerified()
    }, [match])

    const [profile, setProfile] = useState({})
    const [user, setUser] = useState({});
    const [images, setImages] = useState([]);

    
    return (
			<div className="profileView-container">
				{console.log("user => ", user)}
				{console.log("profile => ", profile)}

				<div className="column">
					<div className="row">
						<div className="column">
							<div className="left-panel">
								<h2>
									{user.display_name ? user.display_name : null}
								</h2>
							</div>
						</div>
						<div className="column">
							<div className="images">
								   {images ?  <SlideView images={images}/> : null}
							</div>
						</div>
						<div className="column">
							<div className="right-panel">
								
								<button name="like-btn">
									<i className="fa fa-heart" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="details">
							<h3>Biography</h3>
							<p>{profile.biography}</p>
							<h3>Fame</h3>
							<p>{profile.fame}</p>
						</div>
					</div>
				</div>
			</div>
		);
}

export default ProfileView