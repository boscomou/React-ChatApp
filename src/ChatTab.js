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
  addDoc

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
    await updateDoc(doc(db, "chats", data && data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: inputText,
        senderId: currentUserData.uid,
        date: Timestamp.now(),
      }),
    });
    const chatCollectionCurrentUserRef = collection(doc(db, "userChats", currentUserData.uid), "userChatCollection");
    await updateDoc(doc(chatCollectionCurrentUserRef,data.chatId),{
      lastMessage: inputText,
      date: Timestamp.now(),
    })

    const chatCollectionDataUserRef = collection(doc(db, "userChats", data.user.uid), "userChatCollection");
    await updateDoc(doc(chatCollectionDataUserRef,data.chatId),{
      lastMessage: inputText,
      date: Timestamp.now(),
    })
  }


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats",  data && data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      })

      return () => {
        unsub();
      };

    };
    currentUserData?.uid && getChats();
  }, [data && data.chatId]);

  return (
    <div class="chat-box">
  <div class="header">
    <div class="avatar-wrapper avatar-big">
      <img src={data.user.photoURL} alt="avatar" />
    </div>
    <span class="name">{data.user.username}</span>
    <span class="options">
      <i class="fas fa-ellipsis-h"></i>
    </span>
  </div>
  
  <div class="scrollable-container">
  <div class="scrollable-content">
  <div class="chat-room">
    {messages.map((message) =>
      {
        {console.log(message)}
        if(message.senderId === currentUserData.uid){
          return(
            <div class="message message-right">
            <div class="avatar-wrapper avatar-small">
            <img src={currentUserData.photoURL}/> 
          </div>
          <div class="bubble bubble-dark">
            {message.text}
          </div>
        </div>
          )
        }

        else{
          return(
          <div class="message message-left">
          <div class="avatar-wrapper avatar-small">
            <img src={data.user.photoURL}/> 
          </div>
          <div class="bubble bubble-light">
          {message.text}
          </div>
        </div>
          )
        }
     }
    )
    }

  </div>
  </div>
  </div>

  <div class="type-area">
    <div class="input-wrapper">
      <input type="text" id="inputText" onChange={(e) => setInputText(e.target.value)} placeholder="Type messages here..." />
    </div>
    {/* <span class="button-add">
      <i class="fas fa-plus-circle"></i>
      <div class="others">
        <span class="emoji-button">
          <i class="far fa-laugh"></i>
          <div class="emoji-box">
            <span>&#x1f604;</span>
            <span>😀</span>
            <span>😂</span>
            <span>😭</span>
            <span>😍</span>
            <span>🤮</span>
            <span>🤑</span>
            <span>😖</span>
            <span>😷</span>
          </div>
        </span>
        <span class="image-button">
          <i class="far fa-image"></i>
        </span>
        <span>
          <i class="fas fa-paperclip"></i>
        </span>
      </div>
    </span> */}
    <button onClick={updateChats} class="button-fileSend">file</button>
    <button onClick={updateChats} class="button-send">Send</button>
  </div>

</div>
  )
}

export default ChatTab
