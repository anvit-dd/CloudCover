import { useState, useEffect } from 'react';
import { db } from "../../firebaseinit";
import FileItem from './fileitem';
import FileCard from './filecard';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash, faDownload, faBars, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileDelete from './filedelete';

const FilesView = ({ folder_name }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isOpenDeleteSelectedFilesModal, setOpenDeleteSelectedFilesModal] = useState(false);
  const [viewMode, setViewMode] = useState([false, true]);
  const [deselectTrigger, setDeselectTrigger] = useState(false);
  const showToast = (message,duration)=>toast.success(message,{position:"bottom-right", autoClose:duration, pauseOnHover: false})

  Modal.setAppElement(document.body)
  useEffect(() => {
    const unsubscribe = db.collection(`${folder_name}`).onSnapshot(snapshot => {
      const fetchedFiles = snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      }));
      setFiles(fetchedFiles);
    });
    return () => unsubscribe();
  }, [folder_name]);

  const handleAddSelectedFiles = (f, id) => {
    setSelectedFiles(prev_arr => prev_arr.concat([[f, id]]));
  };

  const handleCloseDeleteSelectedFilesModal=()=>{
    setOpenDeleteSelectedFilesModal(false)
  }

  const handleOpenDeleteSelectedFilesModal=()=>{
    setOpenDeleteSelectedFilesModal(true)
  }

  const deselectAll = () => {
    setDeselectTrigger(prev => !prev);
    selectedFiles.forEach(file => {
      handleRemoveSelectedFiles(file[0]);
    });
    setSelectedFiles([]);
  };

  const handleRemoveSelectedFiles = (f) => {
    setSelectedFiles(selectedFiles.filter(file => file[0] !== f));
  };

  const findUrlFromName = (file_name) => {
    const file = files.find(file => file.item.caption === file_name);
    return file ? file.item.fileUrl : undefined;
  };

  const handleDownloadSelectedFiles = () => {
    let selected_file_urls = selectedFiles.map(file => findUrlFromName(file[0]))
    createDownloadZip(selected_file_urls);
  };

  const switchTableMode = ()=>{
    setViewMode([true, false])
  }

  const switchCardMode = ()=>{
    setViewMode([false, true])
  }

  const createDownloadZip = async (url_arr) => {
    const zip = new JSZip();
    const folder = zip.folder(folder_name);

    const fetchFile = async (url, name) => {
      const response = await fetch(url)
      const blob = await response.blob()
      folder.file(name, blob);
    };

    const fetchPromises = url_arr.map((url, index) => {
      const fileName = selectedFiles[index][0]
      return fetchFile(url, fileName)
    });

    await Promise.all(fetchPromises)

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${folder_name}.zip`)
  }

  const deleteSelectedFiles = ()=>{
    selectedFiles.forEach((f)=>{
      db.collection(folder_name).doc(f[1]).delete();
    })
    handleCloseDeleteSelectedFilesModal()
    showToast(`Successfully deleted ${selectedFiles.length} files`, 1500)
    setSelectedFiles([])

  }

  return (
    <div className='w-[85%] ml-auto mt-20'>
      <div className='flex justify-between'>
        <div className='items-center justify-center mt-3 text-center pr-5 p-2 md:flex'>
          <button onClick={switchTableMode} className={`flex justify-between items-center border-2 w-12 h-8 rounded-l-full ${viewMode[0] ? "bg-blue-500" : ""} duration-150`}>
            <div className='flex items-center justify-center w-6 aspect-square mt-0 ml-2'>
              <FontAwesomeIcon icon={faBars} size='lg' className='text-gray-800' />
            </div>
          </button>

          <button onClick={switchCardMode} className={`flex justify-between items-center border-y-2 border-r-2 w-12 h-8 rounded-r-full ${viewMode[1] ? "bg-blue-500" : ""} duration-150`}>
            <div className='flex items-center justify-center w-6 aspect-square mt-0 ml-4'>
              <FontAwesomeIcon icon={faBorderAll} size='lg' className='text-gray-800' />
            </div>
          </button>
        </div>
      </div>
      {viewMode[1]&&(
      <div className='mx-auto my-4 hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 overflow-scroll'>
        {files.length > 0 ? (
          files.map(({ id, item }) => (
            <FileCard key={id} caption={item.caption} fileurl={item.fileUrl} folder_name = {folder_name} id = {id}/>
          ))
        ) : (
          <p className='w-[85vw] text-center my-28 text-6xl text-gray-300 font-semibold drop-shadow-sm'>No files uploaded... :(</p>
        )}
      </div>)}

      {selectedFiles.length > 0 ? (
        <div className='flex items-center justify-start rounded-t-lg gap-6 bg-blue-400 p-2'>
          <div className='flex items-center gap-2 text-lg'>
            <button onClick={deselectAll} className='rounded-full text-gray-600 hover:bg-blue-500 hover:bg-opacity-30 hover:text-red-600 duration-100'><FontAwesomeIcon icon={faXmark} size='lg' className='p-2 translate-y-0.5 aspect-square' /></button>
            <span className='text-white drop-shadow'>{selectedFiles.length} selected</span>
          </div>
          <div className='flex items-center gap-2'>
            <button onClick={handleDownloadSelectedFiles} className='flex items-center justify-center shadow gap-2 p-2 rounded-lg text-gray-800 bg-blue-300 hover:bg-blue-200 duration-100 font-semibold'>
              <FontAwesomeIcon icon={faDownload} className='' />
              <p>Download</p>
            </button>
            <button onClick={handleOpenDeleteSelectedFilesModal} className='flex items-center justify-center shadow gap-2 p-2 rounded-lg text-gray-800 bg-blue-300 hover:bg-blue-200 duration-100 font-semibold'>
              <FontAwesomeIcon icon={faTrash} className=''/>
              <p>Delete</p>
            </button>
          </div>
        </div>
      ) : (<></>)}

      {viewMode[0]&&(<div className='relative overflow-x-auto'>
        <table className="w-[100%] text-md text-gray-500">
          <thead className="text-md text-gray-700 bg-slate-50">
            <tr className='grid grid-cols-12'>
              <th scope="col" className="col-span-1"></th>
              <th scope="col" className="p-2 pl-32 mr-auto text-left col-span-5">Name</th>
              <th scope="col" className="p-2 m-auto text-left col-span-2">Date Added</th>
              <th scope="col" className="p-2 m-auto text-left col-span-2">Size</th>
              <th scope="col" className="p-2 m-auto text-left col-span-2">Actions</th>
            </tr>
          </thead>
        </table>
      </div>)}
      {viewMode[0]&&(<div className="relative overflow-x-auto overflow-y-scroll">
        <table className="w-full text-md text-gray-500">
          <tbody className='first:bg-slate-400'>
            {files.map(({ id, item }) => (
              <FileItem
                key={id}
                id={id}
                caption={item.caption}
                fileurl={item.fileUrl}
                size={item.size}
                timestamp={item.timestamp}
                folder_name={folder_name}
                add_select_files={handleAddSelectedFiles}
                remove_select_files={handleRemoveSelectedFiles}
                deselectTrigger={deselectTrigger}
              />
            ))}
          </tbody>
        </table>
      </div>)}
      <Modal isOpen = {isOpenDeleteSelectedFilesModal} onRequestClose={handleCloseDeleteSelectedFilesModal} className="grid place-items-center h-full bg-white bg-opacity-10" style={{
          overlay: {
            zIndex: 40
          }
        }}>
            <FileDelete caption={`${selectedFiles.length} files`} delete_data={deleteSelectedFiles} close_modal={handleCloseDeleteSelectedFilesModal}/>
      </Modal>
      <ToastContainer/>
    </div>
  );
};

export default FilesView;
