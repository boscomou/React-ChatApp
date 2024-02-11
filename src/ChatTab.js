import React, { useContext, useState, useEffect,useRef } from 'react'
import { CurrentUserDataContext } from './CurrentUserDataContext'
import { SelectedChatRoomContext } from './SelectedChatRoomContext'
import { SendPhotoContext } from './SendPhotoContext'
import { v4 as uuid } from "uuid";
import { db, storage } from './config/firebase';
import Img from "./img/img.png";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot,
  collection,
  setDoc,
  addDoc

} from "firebase/firestore";
import "./ChatTab.css"
import { SelectedChatContext } from './SelectedChatContext';
import Popup from './component/Popup';
import { Dialog } from '@mui/material';
import { v4 } from "uuid"
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import ImageZoomPopup from './component/ImageZoomPopup';


function ChatTab() {
  const { selectedChatRoom } = useContext(SelectedChatRoomContext)
  const { currentUserData } = useContext(CurrentUserDataContext)
  const { sendPhoto, setSendPhoto } = useContext(SendPhotoContext)
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState([]);
  const { data } = useContext(SelectedChatContext);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [photoURL, setphotoURL] = useState("")
  const [selectedImageURL, setSelectedImageURL] = useState(null)
  const [openImageZoomPopup, setOpenImageZoomPopup] = useState(false)
  const [zoomImage, setzoomImage] = useState("")
  const scrollableContainerRef = useRef(null); // Ref for the scrollable container
  const [messageLimit, setMessageLimit] = useState(10);



  const updateChats = async () => {
    await updateDoc(doc(db, "chats", data && data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: inputText,
        senderId: currentUserData.uid,
        date: Timestamp.now(),
      }),
    });
    const chatCollectionCurrentUserRef = collection(doc(db, "userChats", currentUserData.uid), "userChatCollection");
    await updateDoc(doc(chatCollectionCurrentUserRef, data.chatId), {
      lastMessage: inputText,
      date: Timestamp.now(),
    })

    const chatCollectionDataUserRef = collection(doc(db, "userChats", data.user.uid), "userChatCollection");
    await updateDoc(doc(chatCollectionDataUserRef, data.chatId), {
      lastMessage: inputText,
      date: Timestamp.now(),
    })
    
    scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    setInputText("")

  }


  const uploadImage = () => {
    if (selectedImage == null) {
      return;
    }
    // setUploading(true);
    const imageRef = ref(storage, `images/chats/${selectedImage.name + v4()}`)
    console.log("uploading")
    uploadBytes(imageRef, selectedImage).then(() => {
      alert("ImageUploaded")
      getDownloadURL(imageRef).then(async (downloadURL) => {
        await updateDoc(doc(db, "chats", data && data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: "photo",
            image: downloadURL,
            senderId: currentUserData.uid,
            date: Timestamp.now(),
          }),
        });
        scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight

      })
    })
    setSendPhoto(false)
    // setUploading(false)
   
    setInputText("")



  };



  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", data && data.chatId), (doc) => {
        //doc.exists() && setMessages(doc.data().messages);
        if (doc.exists()) {
          const messagesData = doc.data().messages;
          const newestMessages = messagesData.slice(-messageLimit); // Get the last 10 messages
          setMessages(newestMessages);
        }
      })

      return () => {
        unsub();
      };

    };
    currentUserData?.uid && getChats();
  }, [data && data.chatId,messageLimit]);


  useEffect(() => {
    if (sendPhoto) {
      console.log(sendPhoto)

      uploadImage();
    }
  }, [sendPhoto]);

  useEffect(() => {
    if (selectedImageURL) {
      console.log(selectedImageURL);
      setOpenPopup(true)
    }
  }, [selectedImage]);

  useEffect(() => {
    if (openImageZoomPopup) {
      console.log(openImageZoomPopup);
     
    }
  }, [openImageZoomPopup]);

  var somestyle = {
    width: 200,
    height: 100,
    objectFit: 'cover',
  }
  

  return selectedChatRoom!=null?(
    <div class="chat-box">
      <div class="header">
        <div class="avatar-wrapper avatar-big">
          <img src={data.user.photoURL} style={{width: "100%", height:"100%"}} alt="avatar" />
        </div>
        <span class="name">{data.user.username}</span>
        <span class="options">
          <i class="fas fa-ellipsis-h"></i>
        </span>
      </div>

      <div class="scrollable-container" ref={scrollableContainerRef}>
        <div class="scrollable-content">
          <div class="chat-room">
          <button onClick={() => setMessageLimit((prevLimit) => prevLimit + 10)}>Load previous messages</button>
            {messages.map((message) => {
              if (message.senderId === currentUserData.uid) {
                return (
                  <div class="message message-right">
                    <div class="avatar-wrapper avatar-small">
                      <img src={currentUserData.photoURL} style={{width: "100%", height:"100%"}}/>
                    </div>
                    <div class="bubble bubble-dark"style={{maxWidth:"90%",wordWrap: "break-word" }}>
                      {message.image ? (
                        <img src={message.image} alt="Message Photo" style={somestyle} onClick={()=>{
                          setOpenImageZoomPopup(true) 
                          setzoomImage(message.image)}} />
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                )
              }

              else {
                return (
                  <div class="message message-left">
                    <div class="avatar-wrapper avatar-small">
                      <img src={data.user.photoURL} style={{width: "100%", height:"100%"}}/>
                    </div>
                    <div class="bubble bubble-light">
                      {message.image ? (
                        <img src={message.image} alt="Message Photo" style={somestyle} onClick={()=>{
                          setOpenImageZoomPopup(true) 
                          setzoomImage(message.image)}} />
                          
                      ) : (
                        message.text  
                      )}
                    </div>
                  </div>
                )
              }
            }
            )
            }

          </div>
        </div>
      </div>

      <div class="type-area">
   
          <input type="text" id="inputText" style={{width: "100%",border: 'none', padding: "10px", outline: 'none'}} value = {inputText}  onChange={(e) => setInputText(e.target.value)} placeholder="Type messages here..." />
   
        <Popup
          title={selectedImage?.name}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          image={selectedImageURL}
        >
        </Popup>

        <ImageZoomPopup
          //title={selectedImage?.name}
          openImageZoomPopup={openImageZoomPopup}
          setOpenImageZoomPopup={setOpenImageZoomPopup}
          image={zoomImage}
        >
        </ImageZoomPopup>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          // onClick={setOpenPopup(true)}
          onChange={(e) => {
            setSelectedImage(e.target.files[0])
            setSelectedImageURL(URL.createObjectURL(e.target.files[0]));

          }}

        />
        <label htmlFor="file" class="button-fileSend">
          <img src={Img} alt="" />
          {console.log(selectedImageURL)}
        </label>

        <button onClick={updateChats} class="button-send">Send</button>


      </div>

    </div>
  ):<div>please select a Chat Room</div>
        }

export default ChatTab
