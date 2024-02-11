import React, {useContext, useEffect} from 'react'
import './ChatApp.css';
import Left from './Left';
import Right from './Right'
import  {onAuthStateChanged} from 'firebase/auth'
import { CurrentUserDataContext } from './CurrentUserDataContext';
import {db, auth, storage} from "./config/firebase"
import { getDoc, collection, addDoc,deleteDoc, updateDoc, doc } from 'firebase/firestore'


function Home() {
  const {currentUserData, setCurrentUserData} =  useContext(CurrentUserDataContext)



  useEffect(() => {
    // Set up an observer to listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data());
  
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }


        // setCurrentUserData({"uid" : user.uid,"email":user.email,});
     
      } else {
        // User is signed out
        setCurrentUserData(null);
  
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);
 
  return (
    <div className="App">
      <div className="left-section" style={{ padding: '0px' }} >
        <Left></Left>
      </div>
      <div className="right-section">
        <Right></Right>
      </div>
    </div>
  );
}

export default Home
