
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './ChatApp.css'
import Home from "./Home";
import { SelectedChatRoomContext } from './SelectedChatRoomContext';
import { useState } from 'react';
import FirebaseTest from './FirebaseTest';
import LoginAndSignUpScreen from './LoginAndSignUpScreen';
import { CurrentUserDataContext } from './CurrentUserDataContext';
import Down from "./Down"

function App() {

  const [currentUserData, setCurrentUserData] = useState()
  const [selectedChatRoom,  setSelectedChatRoom] = useState()

  return (
    <BrowserRouter>
      <CurrentUserDataContext.Provider value={{currentUserData, setCurrentUserData}}>
      <SelectedChatRoomContext.Provider value={{ selectedChatRoom, setSelectedChatRoom }}>
        <Routes>
          <Route path="/" element={<LoginAndSignUpScreen/>} />
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/Down" element={<Down/>}></Route>
        </Routes>
      </SelectedChatRoomContext.Provider>
      </CurrentUserDataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
