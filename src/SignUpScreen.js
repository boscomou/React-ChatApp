import {React, useState} from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db,auth, storage} from './config/firebase';

import { getDocs, collection, addDoc,deleteDoc, updateDoc, doc ,setDoc} from 'firebase/firestore'
import{
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {v4} from "uuid"
import ClipLoader from "react-spinners/ClipLoader";
import { blue } from '@mui/material/colors';



function SignUpScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const userRef = collection(db, "user")
 
    const signUp = async () =>{
        try{
          const res = await createUserWithEmailAndPassword(auth, email, password)
          await setDoc(doc(db,"users",res.user.uid),{uid: res.user.uid, email:email, username : username, photoURL: photoURL})
          await setDoc(doc(db, "userChats", res.user.uid), {});
        }catch(err){
          console.error(err);
        }
      }

  

    //Photo
    const [imageUpload, setImageUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [photoURL, setphotoURL] = useState("");



    const uploadImage = () => {
      if(imageUpload ==null){
        return;
      }
      setUploading(true);
      const imageRef=ref(storage,`images/${imageUpload.name + v4()}`)
      console.log("uploading")
      uploadBytes(imageRef, imageUpload).then(()=>{
        alert("ImageUploaded")
        getDownloadURL(imageRef).then(async (downloadURL) => {
          setphotoURL(downloadURL) 
          
        })
      })
      setUploading(false)
      
    };



  return (
    <div>

        <h1>Sign Up</h1>

        <div>
        <div><input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/></div>
        <div><input placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/></div>
        <div><input placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/></div>
        <input type = "file" onChange={(e=>{setImageUpload(e.target.files[0])})} />

        <div>
        <button onClick={uploadImage}>Upload Image</button>
        {uploading &&       <ClipLoader
        color={blue}
        loading={setUploading}
      
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}
        <button onClick={signUp} style={{marginLeft: "40px"}}>Sign Up</button>
        </div>
        </div>
      
    </div>
  )
}

export default SignUpScreen
