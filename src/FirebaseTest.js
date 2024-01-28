import {React, useEffect, useState} from 'react'
import AuthLogin from './component/AuthLogin'
import {db, auth, storage} from "./config/firebase"
import { getDocs, collection, addDoc,deleteDoc, updateDoc, doc } from 'firebase/firestore'
import {ref, uploadBytes} from "firebase/storage";

function FirebaseTest() {

  const [movieList, setMovieList] = useState([])

  //adding new movie
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  //Update Title state
  const [updatedTitle, setUpdatedTitle] = useState(null)

  //file upload state
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async () =>{

    try{
    const data = await getDocs(moviesCollectionRef)
    const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id: doc.id
    }))

    const sortedData = filteredData.sort((a, b) => b.timestamp - a.timestamp);

    console.log(sortedData)
    setMovieList(sortedData)
    } catch(err){
      console.error(err)
    }

  }

  const deleteMovie = async (id) =>{
    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc); 
    getMovieList()
     
  }

  const updatedMovieTitle = async (id) => {
    const movieDoc = doc(db,"movies",id)
    await updateDoc(movieDoc, {title: updatedTitle})
    getMovieList()
  }

  useEffect(()=>{
    getMovieList()
  },[])

  const onSubmitMovie = async() =>{
    try{
      const timestamp = new Date();
      await addDoc(moviesCollectionRef,{title: newMovieTitle, releaseDate: newReleaseDate, receivedAnOscar: isNewMovieOscar,userId: auth?.currentUser?.uid ,timestamp: timestamp})
      getMovieList()
    }catch(err){
      console.error(err)
    }
  }

  const uploadFile  = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`)
    try{
    await uploadBytes(filesFolderRef, fileUpload)
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div style={{ padding: '10px' }} >
       <AuthLogin/>


      <div>
        <input placeholder='Movie title...' onChange={(e)=> setNewMovieTitle(e.target.value)} />
        <input placeholder = "Release Date..." type = "number" onChange={(e)=> setNewReleaseDate(Number(e.target.value))} />
        <input type = "checkbox" checked={isNewMovieOscar} onChange={(e)=> setIsNewMovieOscar(e.target.checked)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
        <input placeholder = "new title..."/>
        <button>update</button>
         
      </div>


       <div>
        {
          movieList.map((movie)=>(
            <div>
              
              <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate}</p>

              {/* delete button */}
              <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

              {/* update button */}
              <input placeholder = "new title..." onChange={(e) => setUpdatedTitle(e.target.value)}/>
              <button onClick={()=> updatedMovieTitle(movie.id)}>Update Title</button>
            </div>
          
          ))
        }
       </div>

        {/* upload file */}
       <div>
        <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
       </div>


    </div>
  )
}

export default FirebaseTest
