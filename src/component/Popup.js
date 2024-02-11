import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useContext ,useState} from 'react'
import { SendPhotoContext } from '../SendPhotoContext'

function Popup(props) {

    const {title, children, openPopup, setOpenPopup,image} = props
    const {sendPhoto,setSendPhoto} = useContext(SendPhotoContext)
    const handleClose = () => {
      setOpenPopup(false);
    };
    
  return (
    <Dialog open={openPopup} onClose={handleClose} >
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent>
        <div>
            
            {console.log(image)}
            {console.log(sendPhoto)}
                {image &&<img src={image} alt="Selected Image" />}
 
   
            
            </div>
        
        {console.log(image)}
      </DialogContent>

    <button onClick={()=>{
      setSendPhoto(true)
      setOpenPopup(false)

    }
    
    }>send</button>
    </Dialog>
  )
}

export default Popup
