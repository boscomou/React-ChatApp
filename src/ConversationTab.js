import React, {useContext,useState,useEffect} from 'react';
import { SelectedChatRoomContext } from "./SelectedChatRoomContext"
import { collection, doc, onSnapshot,getDocs,query,where } from "firebase/firestore";
import { db } from './config/firebase';
import { CurrentUserDataContext } from './CurrentUserDataContext';
import { SelectedChatContext } from './SelectedChatContext';

  function ConversationTab() {

  const {selectedChatRoom, setSelectedChatRoom} = useContext(SelectedChatRoomContext)
  const [chatList, setChatList] = useState([]);

  const {currentUserData} =  useContext(CurrentUserDataContext)
  const { dispatch } = useContext(SelectedChatContext);
  
  useEffect(() => {
    const getChats = async () => {

      const q = query(collection(db, "userChats",currentUserData?.uid,"userChatCollection"))

      const unsub= onSnapshot(q, (querySnapshot) => {
  
        const chats = [];
        querySnapshot.forEach((doc) => {
            chats.push(doc.data());
        });
    
        setChatList(chats)
      });
  
      
      
      return () => {
        unsub();
        
      };
    };

    currentUserData?.uid && getChats();
  }, [currentUserData?.uid]);


  const getDateAndTime = (seconds, nanoseconds) =>{
    const formattedDateTime = new Date(seconds * 1000 + nanoseconds / 1000000);
    const date = formattedDateTime.toDateString(); // Get the formatted date
    const time = formattedDateTime.toLocaleTimeString(); // Get the formatted time
    return (
      <div>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
      </div>
    );
  }


  return (
    
    
    <div>
   
        {chatList?.map((user) => (
          
            
          <a
          key={user.userInfo.username}
          style={
            { 
              textDecoration: 'none', 
              color: 'inherit',
              
            }
          }
          
          onClick={() => {
            setSelectedChatRoom(
              user
            )

            dispatch({type:"CHANGE_USER",payload: user.userInfo})
          
          }
        }
        >
          
          <div
            style={{
              display: 'flex',
              alignItems: 'centre',
              padding: '10px',
              cursor: 'pointer',
              width: '100%', // Added style to fill maximum width
              boxSizing: 'border-box', // Added style to include padding in width calculation
              background: selectedChatRoom && selectedChatRoom.userInfo.username === user.userInfo.username ? '#fafafa' : 'lightblue'
            }}
          >
            <div style={{ marginRight: '10px',  maxWidth:"100%" }}>
              
              <span>{user.userInfo.username}</span>
              <span style={{ display: 'block' ,    width: "100%",wordWrap: "break-word" }}>{user.lastMessage}</span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              
             
              <span>{getDateAndTime(user.date?.seconds,user.date?.nanoseconds)}</span>
            </div>
          </div>
        </a>
        ))}

        </div>

  );
}

export default ConversationTab;