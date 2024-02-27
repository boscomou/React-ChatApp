import React from 'react';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { useState, useEffect } from 'react';


function LoginAndSignUpScreen() {

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [switchLoginAndSignUp, setswitchLoginAndSignUp] = useState(true);

  const toggleScreen = () => {
    setswitchLoginAndSignUp(!switchLoginAndSignUp);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div class="login-container">
      <div>
        <div class="login-container-title">ChatApp</div>
      </div>
      <div class="login-container-bottomsection-container">
        <div class="login-container-bottomsection-section login-container-bottomsection-section-left ">
          <div class="login-container-bottomsection-section-itemcontainer">
            <LoginScreen />
          </div>
        </div>
        <div class="login-container-bottomsection-section login-container-bottomsection-section-right">
          <div class="login-container-bottomsection-section-itemcontainer">
            <SignUpScreen />
          </div>
        </div>
      </div>
    </div>
    // <div style={{ width: "100%", height:"100vh", overflow: "hidden"}}>
    //   <h1 style={{ padding: "20px" }}>ChatApp</h1>
    //   {console.log(screenSize)}



    //   {screenSize.width >= 600 && (
    //     <div className='login-container'>
    //       <div className='login-section'  >
    //         <LoginScreen />
    //       </div>
    //       <div className='signUp-section ' >
    //         <SignUpScreen />
    //       </div>
    //     </div>
    //   )}

    //   {screenSize.width < 600 && (

    //     <div className='login-container'>
    //       {switchLoginAndSignUp ?
         
    //           <div className='login-section' >
    //             <LoginScreen />
    //           </div>
      
    //         :
         
    //           <div className='signUp-section' >
    //             <SignUpScreen />
    //           </div>
    //       }
    //       <button onClick={toggleScreen}>
    //         {switchLoginAndSignUp ? 'Switch to Sign Up' : 'Switch to Login'}
    //       </button>
    //     </div>
    //   )}


    // </div>

  )
}

export default LoginAndSignUpScreen;