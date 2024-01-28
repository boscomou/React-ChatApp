import React from 'react'
import SearchTab from './SearchTab'
import ChatTab from './ChatTab'
import UserTag from './UserTag'


function Right() {
  
  

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button>Logout</button>
      </div>

      <div style={{ padding: '10px' }} >
        <UserTag />
      </div>

      <div style={{ padding: '10px' }} >
        <ChatTab />
      </div>
    </div>
  )
}


export default Right
