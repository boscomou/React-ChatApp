import React, { useContext, useState, useEffect } from 'react'
import { CurrentUserDataContext } from './CurrentUserDataContext'
import { SelectedChatRoomContext } from './SelectedChatRoomContext'
import { v4 as uuid } from "uuid";
import { db, storage } from './config/firebase';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import "./ChatTab.css"

function ChatTab() {
  const { selectedChatRoom } = useContext(SelectedChatRoomContext)
  const { currentUserData } = useContext(CurrentUserDataContext)
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState([]);


  const updateChats = async () => {
    await updateDoc(doc(db, "chats", selectedChatRoom && selectedChatRoom[0]), {
      messages: arrayUnion({
        id: uuid(),
        text: inputText,
        senderId: currentUserData.uid,
        date: Timestamp.now(),
      }),
    });
    
    await updateDoc(doc(db,"userChats",selectedChatRoom && selectedChatRoom[0]),{
      
    })
  }


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats",  selectedChatRoom[0]), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      })

      return () => {
        unsub();
      };

    };
    currentUserData?.uid && getChats();
  }, [selectedChatRoom && selectedChatRoom[0]]);

  return (
    <div>

      <div>

        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </div>

      <div>
      <button onClick={updateChats}>send</button>
  
      </div>

      
  <div class="messages">
    <div class="messages-content"></div>
  </div>
  {/* <div class="message-box">
    <textarea type="text" class="message-input" placeholder="Type message..."></textarea>
    </div> */}

      <div>
      {messages.map((message) => {
        console.log(message.text);
        return <p class="message-box">{message.text}</p>;
      })}
      </div>
    </div>
  )
}

export default ChatTab
