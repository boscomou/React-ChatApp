import { React, useState, useEffect } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import {Link, useNavigate} from "react-router-dom"

function AuthLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userEmail, setUserEmail] = useState(null); // State variable to store the user's email
  const [errorMessage, setErrorMessage] = useState("");
  const [userUid, setUserUid] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    // Set up an observer to listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUserEmail(user.email);
        setUserUid(user.uid);
        setErrorMessage("");
      } else {
        // User is signed out
        setUserEmail(null);
        setUserUid(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);


  console.log(auth?.currentUser?.email)
  console.log(auth?.currentUser?.uid)


  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/Home")
    } catch (err) {
      console.error(err);
      setErrorMessage("Incorrect email or password. Please try again.");
      alert("Incorrect email or password. Please try again.");
      setUserEmail(null);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <button onClick={logout}> Sign Out</button>
      <button> hi</button>

      <div style={{color: "red"}}>
        {errorMessage}
      </div>
      <div style={{ margin: '10px 0' }}>
      {/* Spacer with margin */}
    </div>
      <div>
        {userEmail ? userEmail : "There are no sign-in credentials"}
        {userUid ? userUid : "There are no sign-in credentials"}
      </div>
    </div>
  )
}

export default AuthLogin
