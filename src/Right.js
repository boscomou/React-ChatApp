import React from 'react'
import SearchTab from './SearchTab'
import ChatTab from './ChatTab'
import UserTag from './UserTag'
import { auth, googleProvider } from 'c:/Users/bosco/Downloads/React-ChatApp-main/src/config/firebase'
import { signOut } from 'firebase/auth'
import {Link, useNavigate} from "react-router-dom"
import './Right.css';



function Right() {

    const navigate = useNavigate();

    const logOut = async () => {
        try {
          await signOut(auth)
          navigate("/")
        } catch (err) {
          console.error(err);
        }
      }
  

  return (
    <div className="rightScreen" >

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={logOut}>Logout</button>
      </div>


      <div style={{ padding: '10px',flex:1,overflow:'hidden'}} >
        <ChatTab />
      </div>
    </div>
  )
}


export default Right
