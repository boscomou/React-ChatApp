import {React, useEffect, useState} from 'react'
import AuthLogin from './component/AuthLogin'

function LoginScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div>
      <h1>Login</h1>
      {/* <input placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
      <input placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />

      <div>
        {email}
        {password}
      </div> */}
      <AuthLogin/>
    </div>
  )
}

export default LoginScreen
