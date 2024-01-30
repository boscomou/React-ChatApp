import React, {useContext,useState,useEffect} from 'react';
import { SelectedChatRoomContext } from "./SelectedChatRoomContext"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from './config/firebase';
import { CurrentUserDataContext } from './CurrentUserDataContext';
import { SelectedChatContext } from './SelectedChatContext';

  function ConversationTab() {

  const {selectedChatRoom, setSelectedChatRoom} = useContext(SelectedChatRoomContext)
  const [chatList, setChatList] = useState([]);

  const {currentUserData} =  useContext(CurrentUserDataContext)
  const { dispatch } = useContext(SelectedChatContext);
  
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats",currentUserData?.uid), (doc) => {
        setChatList(doc.data());
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
   
        {Object.entries(chatList)?.map((user) => (
          <a
          key={user[1].userInfo.username}
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
            dispatch({type:"CHANGE_USER",payload: user[1].userInfo})
          
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
              background: selectedChatRoom && selectedChatRoom[1].userInfo.username === user[1].userInfo.username ? 'lightblue' :'blue'
            }}
          >
            <div style={{ marginRight: '10px' }}>
              <span>{user[1].userInfo.username}</span>
              <span style={{ display: 'block' }}>{user[1].lastMessage?.text}</span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              
              {/* <span>{user[1].userInfo.username}</span> */}
              <span>{getDateAndTime(user[1].date?.seconds,user[1].date?.nanoseconds)}</span>
            </div>
          </div>
        </a>
        ))}

        </div>

  );
}

export default ConversationTab;