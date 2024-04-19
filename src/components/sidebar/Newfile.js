import React, { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@material-ui/core/Modal';
import firebase from 'firebase';
import { storage, db } from '../../firebaseinit';

export default function Newfile({ folder_name }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [highlighted, setHighlighted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState("0");
  const [uploadCount, setUploadCount] = useState(0);
  const [uploadingStatuses, setUploadingStatuses] = useState({});
  const max_len = 20;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFiles([]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const uploadPromises = files.map(async (f) => {
      const uploadTask = storage.ref(`files/${f.name}`).put(f);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadingProgress(progress);
        },
        (error) => {
          setUploadingStatuses(prevStatuses => ({ ...prevStatuses, [f.name]: "error" }));
        },
        async () => {
          handleFileUploadCount();
          try {
            const url = await storage.ref('files').child(f.name).getDownloadURL();
            await db.collection(`${folder_name}`).add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: f.name,
              fileUrl: url,
              size: f.size
            });
            setUploadingStatuses(prevStatuses => ({ ...prevStatuses, [f.name]: "success" }));
          } catch (error) {
            setUploadingStatuses(prevStatuses => ({ ...prevStatuses, [f.name]: "error" }));
          }
        }
      );
      return uploadTask;
    });

    await Promise.all(uploadPromises)
      .then(() => {
        setUploading(false);
        setUploadCount(0);
        setFiles([])
        setUploadingProgress(0);
        setTimeout(() => {
          setOpen(false)
        }, 1000);
      })
      .catch((error) => {
        setUploading(false);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlighted(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setHighlighted(true);
  };

  const handleRemoveFile = (file_name) => {
    setFiles(files.filter(f => f.name !== file_name));
    setUploadingStatuses(prevStatuses => {
      const { [file_name]: _, ...updatedStatuses } = prevStatuses;
      return updatedStatuses;
    });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHighlighted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlighted(false);
    const droppedFiles = [...e.dataTransfer.files];
    setFiles(droppedFiles);
    setUploadingStatuses(Object.fromEntries(droppedFiles.map(file => [file.name, ""])));
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = [...e.target.files];
    setFiles(selectedFiles);
    setUploadingStatuses(Object.fromEntries(selectedFiles.map(file => [file.name, ""])));
  };

  const handleFileUploadCount = () => {
    setUploadCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <button onClick={handleOpen} className="flex bg-blue-500 w-[100%] p-4 text-xl text-white justify-center rounded-full font-semibold shadow-md shadow-slate-500 hover:bg-blue-600">
        <UploadIcon className="scale-110 mt-1 mr-3" />
        <p>Upload</p>
      </button>

      <Modal open={open} onClose={handleClose}>
        <div className='flex justify-center items-center h-screen'>
          <div className=' flex-col w-[25%] h-max bg-white p-6 text-xl rounded-lg shadow-md'>
            <div className=
              {highlighted ?
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
                <CloudUploadIcon className=' m-auto mb-8 text-blue-500 scale-[400%]' />
                <input id="plain-input" type="file" multiple className='hidden' onChange={handleFileInputChange} />
                <p className='px-20 text-lg font-semibold text-center text-gray-700'>Drag your documents, photos, or videos here.</p>
                <div className='flex items-center px-24'>
                  <hr className='w-[45%] border border-blue-100 rounded-full' />
                  <p className='p-2 text-gray-700'>OR</p>
                  <hr className='w-[45%] border border-blue-100 rounded-full' />
                </div>
                <label htmlFor='plain-input' className='m-auto px-2 py-1.5 text-blue-500 cursor-pointer text-center font-semibold border-2 border-blue-500 rounded hover:bg-blue-500 hover:text-white duration-200'>Browse Files</label>
              </div>
            </div>
            {uploading ?
              (<div>
                <p className='text-zinc-700 py-4 text-sm font-semibold'>Uploaded - {uploadCount}/{files.length} files</p>
                <div>
                  <div className='w-[100%] h-2 bg-slate-200 rounded-lg'>
                    <div className='h-2 bg-blue-500 rounded-lg' style={{ width: `${uploadingProgress}%` }}></div>
                  </div>
                </div>
              </div>)
              :
              <></>
            }
            {
              files.length === 0 ?
                (<p className='my-2 text-center text-slate-600'>No files added</p>)
                :
                (<div className='h-[200px] overflow-scroll scroll-smooth p-2'>
                  {files.map((f) => (
                    <div key={f.name} className='flex bg-sky-50 my-4 p-2 rounded-lg'>
                      <div className='flex items-center w-[100%]'>
                        <div className='flex items-center pl-2'>
                          <InsertDriveFileIcon />
                          {
                            String(f.name).length > max_len ?
                              (<p className='text-lg'>{String(f.name).slice(0, max_len)}...</p>)
                              :
                              (<p className='text-lg'>{f.name}</p>)
                          }
                        </div>
                        <div className='ml-auto flex items-center gap-2'>
                          {uploadingStatuses[f.name] === "success" && <DoneIcon className='text-green-500' />}
                          <button onClick={() => { handleRemoveFile(f.name) }} className='flex items-center justify-center p-1 rounded-full hover:text-red-500 hover:bg-sky-100'><ClearIcon /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>)
            }
            <div className='flex gap-2'>
              <button onClick={handleClose} className='bg-white p-2 px-4 mt-4 mr-auto font-medium text-black border-2 rounded hover:bg-slate-100'>Cancel</button>
              {
                !uploading ?
                  (<button onClick={handleUpload} className='bg-blue-500 p-2 px-4 mt-4 font-semibold text-slate-200 rounded hover:bg-blue-600'>Upload Files</button>)
                  :
                  (<button onClick={handleUpload} className='bg-blue-500 p-2 px-4 mt-4 font-semibold text-slate-200 rounded hover:bg-blue-600'>Uploading...</button>)
              }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
