import React, { Component , useContext} from 'react'
import {ref,getDownloadURL} from "firebase/storage"
import { db,auth, storage} from './config/firebase';
import { CurrentUserDataContext, currentUserUid } from './CurrentUserDataContext';



function ProfileTab() {

  const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext)

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '20px',
    width: '100%',
    maxWidth: '100%',
  };

  const imageStyle = {
    marginRight: '10px',
  };

//   const getPhotoURL = async() =>{
    
//     try{
//       const data = await getDocs(moviesCollectionRef)
//       const filteredData = data.docs.map((doc)=>({
//         ...doc.data(),
//         id: doc.id
//       }))
//   }
// }


  return (
    <div style={containerStyle}>
      <div>
        <img src={currentUserData?.photoURL} alt="Round Image" style={imageStyle} className="round-image" />
   
      </div>
      <div>
        <button className="right-button">setting</button>
      </div>
    </div>
  );
}

export default ProfileTab
