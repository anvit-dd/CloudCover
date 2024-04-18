import React,{useState} from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@material-ui/core/Modal'
import firebase from 'firebase'
import { storage, db } from '../../firebaseinit';

export default function Newfile({folder_name}){
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState([])
  const [highlighted, setHighlighted] = useState(false);
  const [uploading, setUploading] = useState(false)

  const handleOpen = () =>{
      setOpen(true)
  }
  const handleClose = () =>{
      setOpen(false)
      setFile([])
  }

  const handleUpload = () => {
    if(file.length===0){
      setOpen(false)
      setFile(null)
    }
    else{
      setUploading(true)
      for (let i = 0; i < file.length; i++) {
        storage.ref(`files/${file[i].name}`).put(file[i]).then(snapshot => {
            storage.ref('files').child(file[i].name).getDownloadURL().then(url => {
              db.collection(`${folder_name}`).add({
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


  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlighted(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setHighlighted(true);

  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHighlighted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlighted(false);

  const droppedFiles = [...e.dataTransfer.files];
    setFile(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = [...e.target.files];
    setFile(selectedFiles);
  };
  return (
    <div>
      <button onClick = {handleOpen} className="flex bg-blue-500 p-5 w-[125px] text-xl text-white justify-center rounded-2xl font-semibold shadow-md shadow-slate-500 hover:bg-blue-600">
        <UploadIcon className="scale-110 mt-1 mr-3"/>
        <p>Upload</p>
      </button>

      <Modal open = {open} onClose={handleClose}> 
        <div className='flex justify-center items-center h-screen'>
          <div className=' flex-col w-[25%] h-max bg-white p-6 text-xl rounded-lg shadow-md'>
            {/* <p className='font-semibold mb-4'>Upload Files</p> */}

            <div className=
              {highlighted?
                ('flex h-scrren p-4 pt-1 bg-sky-100 w-[100%] aspect-square h-max rounded-md border-gray-400 border-2 border-dashed')
                :
                ('flex h-scrren p-4 pt-1 bg-sky-50 w-[100%] aspect-square h-max rounded-md border-gray-400 border-2 border-dashed')
              }
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-[100%] my-auto mx-auto grid">
                <CloudUploadIcon className=' m-auto mb-8 text-blue-500 scale-[400%]'/>
                <input id = "plain-input" type="file" multiple className='hidden' onChange={handleFileInputChange}/>
                <p className='px-20 text-lg font-semibold text-center text-gray-700'>Drag your documents, photos, or videos here.</p>
                <div className='flex items-center px-24'>
                  <hr className='w-[45%] border border-blue-100 rounded-full'/>
                  <p className='p-2 text-gray-700'>OR</p>
                  <hr className='w-[45%] border border-blue-100 rounded-full'/>
                </div>
                <label htmlFor='plain-input' className='m-auto px-2 py-1.5 text-blue-500 cursor-pointer text-center font-semibold border-2 border-blue-500 rounded hover:bg-blue-500 hover:text-white duration-200'>Browse Files</label>
              </div>
            </div>
            <div className='h-[200px] overflow-scroll'>
              {file.map((f)=>(
                <div className='flex bg-sky-50 my-4 p-2 rounded-lg'>
                  <div className='flex items-center w-[100%]'>
                    <div className='flex items-center pl-2'>
                      <InsertDriveFileIcon/>
                      <p className='text-lg'>{f.name}</p>
                    </div>
                    <button className='flex items-center justify-center ml-auto p-1 rounded-full hover:text-red-500 hover:bg-sky-100'><ClearIcon/></button>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              <button onClick = {handleClose} className='bg-white p-2 px-4 mt-4 mr-auto font-medium text-black border-2 rounded hover:bg-slate-100'>Cancel</button>
              <button onClick = {handleUpload} className='bg-blue-500 p-2 px-4 mt-4 font-semibold text-slate-200 rounded hover:bg-blue-600'>Upload Files</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>

  )
}
