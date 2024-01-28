import React from 'react';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

function LoginAndSignUpScreen() {
  return (
    <div>
      <h1>ChatApp</h1>
      <div style={{display: 'flex'}}>
        <div className='login-section'>
          <LoginScreen/>
        </div>

        <div className='signUp-section'>
          <SignUpScreen/>
        </div>
      </div>
    </div>

  )
}

export default LoginAndSignUpScreen;