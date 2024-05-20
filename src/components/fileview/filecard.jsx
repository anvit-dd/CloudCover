import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFilePdf, faFile, faFileExcel, faFileWord, faCode, faFileVideo, faEllipsisVertical,faArrowsUpDownLeftRight, faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import FileModal from "./filemodal";
import FileTitle from "./filetitle";
import { db } from "../../firebaseinit"
import Modal from 'react-modal';
import FileDelete from "./filedelete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getFileType = (file_name) => {
  return (file_name.split(".")[1]);
};

const isImage = (file_name) => {
  const image_type_arr = ["png", "jpeg", "jpg", 'gif', 'svg', 'webp', "tiff"];
  return (image_type_arr.includes(getFileType(file_name)));
};

const thumbnail_doc_map = {
  "pdf": <FontAwesomeIcon icon={faFilePdf} className="text-red-500" size='6x' />,
  "doc": <FontAwesomeIcon icon={faFileWord} className='text-blue-500' size='6x' />,
  "docx": <FontAwesomeIcon icon={faFileWord} className='text-blue-500' size='6x' />,
  "xlsx": <FontAwesomeIcon icon={faFileExcel} className='text-green-500' size='6x' />,
  "csv": <FontAwesomeIcon icon={faFileExcel} className='text-green-500' size='6x' />,
  "exe": <FontAwesomeIcon icon={faCode} className='text-red-600' size='6x' />,
  "mp4": <FontAwesomeIcon icon={faFileVideo} className='text-red-600' size='6x' />,
  "avi": <FontAwesomeIcon icon={faFileVideo} className='text-red-600' size='6x' />,
  "default": <FontAwesomeIcon icon={faFile} className="text-slate-600" size='6x' />
};

const getThumbnail = (caption, fileurl) => {
  return isImage(caption) ? (<img src={fileurl} alt={caption} className='w-[100%] m-auto aspect-square object-cover rounded-lg' />) :
    (<div className='flex justify-center items-center h-max aspect-square'>
      {
        getFileType(caption) in thumbnail_doc_map ?
          (thumbnail_doc_map[getFileType(caption)]) :
          (thumbnail_doc_map["default"])
      }
    </div>);
};

const FileCard = ({ key, caption, fileurl, folder_name, id }) => {
  const char_lim = 17;
  const [open, setOpen] = useState(false);
  const [openOptionModal, setOpenModal] = useState(false);
  const [isOpenOptionDeleteModal, setOpenOptionDeleteModal] = useState(false);
  const option_target = useRef(null);
  const showToast = (message,duration)=>toast.success(message,{position:"bottom-right", autoClose:duration, pauseOnHover: false})
  const [modalStyle, setModalStyle] = useState({
    overlay: {
      zIndex: 40,
      backgroundColor: "transparent"
    },
    content: {}
  });

  useEffect(() => {
    if (openOptionModal) {
      const rect = option_target.current.getBoundingClientRect();
      setModalStyle((prevStyle) => ({
        ...prevStyle,
        content: {
          top: `${rect.bottom}px`,
          left: `${rect.left-120}px`,
          right: 'auto',
          bottom: 'auto',
          width: '150px',
          height: 'auto',
          backgroundColor: 'white',
          "box-shadow":"1px 1px 1px rgb(75,85,99)",
          border: '1px solid #ccc',
          padding: '5px',
          zIndex: 50
        }
      }));
    }
  }, [openOptionModal]);

  const handleOpenViewFile = () => {
    setOpen(true);
  };

  const handleCloseViewFile = () => {
    console.log("Closed show");
    setOpen(false);
  };

  const openCardOptionModal = (e) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  const closeCardOptionModal = () => {
    setOpenModal(false);
  };

  const openFileFromCardModal = () => {
    closeCardOptionModal()
    handleOpenViewFile()
  }

  const downloadFileFromOption = ()=>{
    const link = document.createElement('a');
    link.href = fileurl;
    link.download = caption;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const deleteData = () => {
    try {
      db.collection(folder_name).doc(id).delete();
      showToast("Successfully deleted " + caption, 1500);
    } catch (error) {
      showToast("Error occured while deleting " + caption+". Try again!", 1500);
    }
  }

  const openDeleteOptionModal = ()=>{
    setOpenOptionDeleteModal(true)
  }

  const closeDeleteOptionModal = ()=>{
    setOpenOptionDeleteModal(false)
  }

  return (
    <div className='flex md:w-[25vw] lg:w-[20vw] max-w-sm rounded-lg mb-4 p-2 bg-slate-100 text-zinc-700 hover:shadow-md ease-in-out duration-200 hover:bg-slate-200'>
      <button onClick={handleOpenViewFile} className='w-[100%]'>
        <div id={key} className="flex justify-center items-center font-semibold gap-4 p-1">
          <FileTitle caption={caption} char_lim={char_lim} />
          <button ref={option_target} onClick={openCardOptionModal} className="flex items-center hover:bg-slate-300 rounded-full p-3 aspect-square duration-200">
            <FontAwesomeIcon icon={faEllipsisVertical} className="" />
          </button>
        </div>
        {getThumbnail(caption, fileurl)}
      </button>
      <FileModal fileurl={fileurl} file_name={caption} title={<FileTitle caption={caption} char_lim={50} />} open={open} close={handleCloseViewFile} />
      
      <Modal isOpen={openOptionModal} onRequestClose={closeCardOptionModal} style={modalStyle}>
        <button onClick={openFileFromCardModal} className="w-[100%] text-left pl-2 p-2 space-x-2 hover:bg-gray-100">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} className="text-zinc-800" />
          <span>Open</span>
        </button>

        <button onClick={downloadFileFromOption} className="w-[100%] text-left pl-2 p-2 space-x-2 hover:bg-gray-100">
          <FontAwesomeIcon icon={faDownload} className="text-zinc-800" />
          <span>Download</span>
        </button>
        
        <button onClick={openDeleteOptionModal} className="w-[100%] text-left pl-2 p-2 space-x-2 hover:bg-gray-100">
          <FontAwesomeIcon icon={faTrash} className="text-zinc-800" />
          <span>Delete</span>
          </button>
      </Modal>

      <Modal isOpen = {isOpenOptionDeleteModal} onRequestClose={closeDeleteOptionModal} className="grid place-items-center h-full bg-white bg-opacity-10" style={{
          overlay: {
            zIndex: 40
          }
        }}>
        <FileDelete caption={`Delete ${caption}?`} delete_data={deleteData} close_modal={closeDeleteOptionModal}/>
      </Modal>
      <ToastContainer containerId="CardOptionsToast"/>
    </div>
  );
};

export default FileCard;
