import React,{useState} from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import Modal from '@material-ui/core/Modal'
import firebase from 'firebase'
import { storage, db } from '../../firebaseinit';

export default function Newfile() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const handleOpen = () =>{
      setOpen(true)
  }
  const handleClose = () =>{
      setOpen(false)
  }

  const handleChange = (e) => {
        if(e.target.files[0])
    {
      setFile(e.target.files)
    }
  }

  const handleUpload = () => {
    if(file==null){
      setOpen(false)
      setFile(null)
    }
    else{
      setUploading(true)
      for (let i = 0; i < file.length; i++) {
        storage.ref(`files/${file[i].name}`).put(file[i]).then(snapshot => {
            storage.ref('files').child(file[i].name).getDownloadURL().then(url => {
              db.collection('myFiles').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: file[i].name,
              fileUrl: url,
              size: snapshot._delegate.bytesTransferred,
              })
                })
            })
      }
      setUploading(false)
      setOpen(false)
      setFile(null)
    }
}
  return (
    <div>
      <button onClick = {handleOpen} className="flex bg-blue-500 p-5 w-[125px] text-xl text-white justify-center rounded-2xl font-semibold shadow-md shadow-slate-500 hover:bg-blue-600">
        <UploadIcon className="scale-110 mt-1 mr-3"/>
        <p>Upload</p>
      </button>

      <Modal open = {open} onClose={handleClose}> 
        <div className='flex justify-center items-center h-screen'>
          <div className=' flex-col w-[25%] h-min bg-slate-200 p-2 text-center text-xl rounded shadow-md'>
            <p>Select Files you want to upload!</p>
            {
              uploading? (<p className='bg-blue-500 p-2 px-6 mt-8 mb-4 font-semibold text-slate-200 rounded'>Uploading...</p>)
              :
              (
                <>
                  <input type='file' multiple className='mt-4 ml-8 text-center border-0' onChange={handleChange}/><br/>
                  <button onClick = {handleUpload} className='bg-blue-500 p-2 px-6 mt-8 mb-4 font-semibold text-slate-200 rounded hover:bg-blue-600'>Upload</button>
                </>
              )
            }
            </div>
        </div>
      </Modal>
    </div>

  )
}
