import React from 'react'
import SearchTab from './SearchTab'
import ChatTab from './ChatTab'
import UserTag from './UserTag'
import './Right.css';



function Right() {
  
  

  return (
    <div className="rightScreen" >

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button>Logout</button>
      </div>


      <div style={{ padding: '10px',flex:1,overflow:'hidden'}} >
        <ChatTab />
      </div>
    </div>
  )
}


export default Right
