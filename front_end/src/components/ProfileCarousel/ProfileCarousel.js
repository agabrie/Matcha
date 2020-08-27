import React, { useState, useEffect} from 'react';
import './ProfileCarousel.css';
import ProfileCard from '../ProfileCard/ProfileCard';
import {getUnsortedSearchResults } from "../../func";

function ProfileCarousel () {
    useEffect(() => {
        fetchProfiles()
    }, [])

    const [profiles, setProfiles] = useState([])
    const [currentIndex, setIndex] = useState(0)
    
   const fetchProfiles = async() => {
       const response = await getUnsortedSearchResults();
       console.log(response);
        setProfiles(response);
    }

    const navigate = (direction) => {
        let index = currentIndex
        const length = profiles.length
        if (direction === 'left') {
            index--
            if(index < 0)
                index = length - 1
        }
        if (direction === 'right') {
            index++
            if(index === length)
                index = 0
        }
        setIndex(index)
    }
        const currentProfile = profiles[currentIndex]
        return (
            <div className="card-container" >
           { currentProfile ? <ProfileCard user={currentProfile} navigate={navigate}/> : null}  
            </div>
        )
}

export default ProfileCarousel;