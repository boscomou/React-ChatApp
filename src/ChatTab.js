import React, { useContext, useState, useEffect } from 'react'
import { CurrentUserDataContext } from './CurrentUserDataContext'
import { SelectedChatRoomContext } from './SelectedChatRoomContext'
import { v4 as uuid } from "uuid";
import { db, storage} from './config/firebase';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot,
  collection,
  setDoc,

} from "firebase/firestore";
import "./ChatTab.css"
import { SelectedChatContext } from './SelectedChatContext';

function ChatTab() {
  const { selectedChatRoom } = useContext(SelectedChatRoomContext)
  const { currentUserData } = useContext(CurrentUserDataContext)
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState([]);
  const { data } = useContext(SelectedChatContext);


  const updateChats = async () => {
    await updateDoc(doc(db, "chats", selectedChatRoom && selectedChatRoom[0]), {
      messages: arrayUnion({
        id: uuid(),
        text: inputText,
        senderId: currentUserData.uid,
        date: Timestamp.now(),
      }),
    });
    
    await updateDoc(doc(db,"userChats",currentUserData.uid,"boV5Dlf62TPttVZ66xfB1vDRaao2NgdgaYNeXoSa46TB6ww8ZU8RfRJ3"),{
      lastMessage: "hi"
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

      <div>
        {data.chatId}
        <br></br>
        {data.user.uid}
        {console.log(data.user.uid)}
      </div>
      </div>
    </div>
  )
}

export default ChatTab
