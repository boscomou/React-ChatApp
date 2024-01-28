import React from 'react'
import {useContext, useState} from "react"
import { SelectedChatRoomContext} from "./SelectedChatRoomContext"


function  UserTag() {
  
  const {selectedUser} = useContext(SelectedChatRoomContext)

  return (
      <div style={{
        borderRadius: "20px", // Rounded corners
        width: "400px", // Adjust the width as needed
        padding: "8px", // Add padding for visual spacing
      }}>
        
 

      <span>{selectedUser && selectedUser.name}</span>

      
      </div>
  
  )
}

export default UserTag
 