import { React, useState, useContext } from "react";
import { collection, query, where } from "firebase/firestore";
import { db, auth, storage } from './config/firebase';
import { getDocs,  addDoc, deleteDoc, updateDoc, doc, getDoc,setDoc, serverTimestamp } from 'firebase/firestore'
import { CurrentUserDataContext } from "./CurrentUserDataContext";
import { SelectedChatContext } from "./SelectedChatContext";

import './SearchTab.css';


function SearchTab() {
  const [input, setInput] = useState("")
  const [user,setUser] = useState(null)
  const [err, setErr] = useState(false);

  const { currentUserData, setCurrentUserData } = useContext(CurrentUserDataContext);
  


  const handleSearch = async () => {

    const q = query(collection(db, "users"), where("username", "==", input))


    try{
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUser(doc.data())
    });}
    catch(err){
  
    }

  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async()=>{

        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
        currentUserData.uid > user.uid
          ? currentUserData.uid + user.uid
          : user.uid + currentUserData.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          try{

          const chatCollectionRef = collection(doc(db, "userChats", currentUserData.uid), "userChatCollection");

          await setDoc(doc(chatCollectionRef,combinedId ), {
           
              userInfo: {
                uid: user.uid,
                username: user.username,
                photoURL: user.photoURL,
              },
              date: serverTimestamp(),
            lastMessage: null,
            
          });
          
        
        }
          catch(err){
            console.log(err)

          }
  
          try{

            const chatCollectionRef = collection(doc(db, "userChats", user.uid), "userChatCollection");
  
            await setDoc(doc(chatCollectionRef,combinedId ), {
             
                userInfo: {
                  uid:currentUserData.uid,
                  username: currentUserData.username,
                  photoURL: currentUserData.photoURL,
                },
                date: serverTimestamp(),
              lastMessage: null,
              
            });
            
          
          }
            catch(err){
              console.log(err)
  
            }
    

        }
      } catch (err) {}
  
      setUser(null);
      setInput("")

  }

  return (
    <div >
      <div>
      <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e =>
      setInput(e.target.value)}
        style={{
          borderRadius: "20px", // Rounded corners
          width: "400px", // Adjust the width as needed
          padding: "8px", // Add padding for visual spacing
        }}
      />
      </div>
      <div>
      {user && (
        <div  style={{ display: 'flex', alignItems: 'center', paddingTop: '10px',height:"60.px" }} onClick={handleSelect} >
          <div style={{paddingRight:"10px"}}>
           <img src={user.photoURL} alt="Round Image" class='imageStyle' className="round-image" /> 
           </div>
           {user.username}
        </div>
      )}
      </div>

    </div>
  );
}

export default SearchTab
