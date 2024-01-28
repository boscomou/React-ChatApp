import React from 'react'
import ProfileTab from './ProfileTab'
import SearchTab from './SearchTab'
import ConversationTab from './ConversationTab'


function Left() {

  return (
    <div  >
      <div style={{ padding: '20px' }} >
        <ProfileTab/>
      </div>
      <div style={{ padding: '10px' }} >
      <SearchTab/>
      </div>
      <div  >
        <ConversationTab/>
      </div>
    </div>
  )
}

export default Left
