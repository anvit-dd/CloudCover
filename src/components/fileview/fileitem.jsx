import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebaseinit";
import { toast } from 'react-toastify';
import FileModal from './filemodal';
import FileTitle from './filetitle';
import Modal from "react-modal";
import FileDelete from './filedelete';

const FileItem = ({ id, caption, timestamp, fileurl, size, folder_name, add_select_files, remove_select_files, deselectTrigger }) => {
  const [openFile, setOpenFile] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [isChecked, setChecked] = useState(false); // Start as unchecked
  const month_arr = ["Jan", "Feb", 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const filedate = `${timestamp?.toDate().getDate()} ${month_arr[timestamp?.toDate().getMonth()]} ${timestamp?.toDate().getFullYear()}`;
  const showToast = (message, duration) => toast.success(message, { position: "bottom-right", autoClose: duration, pauseOnHover: false });
  Modal.setAppElement(document.body);

  const handleOpenViewFile = () => {
    setOpenFile(true);
  };

  const handleCloseViewFile = () => {
    setOpenFile(false);
  };

  const handleOpenDeleteModal = () => {
    setDeleteFile(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteFile(false);
  };

  const get_file_size = (file_size_bytes) => {
    const file_size = ["Bytes", "kB", "MB", "Gb"];
    let i = 0;
    while (file_size_bytes > 1024) {
      file_size_bytes /= 1024;
      i++;
    }
    return `${file_size_bytes.toFixed(2)} ${file_size[i]}`;
  };

  const handleCheckBoxChange = () => {
    if (isChecked) {
      remove_select_files(caption, id);
    } else {
      add_select_files(caption, id);
    }
    setChecked(!isChecked);
  };

  const deleteData = () => {
    try {
      db.collection(folder_name).doc(id).delete();
      showToast("Successfully deleted " + caption, 1500);
    } catch (error) {
      alert("Error Occurred");
    }
  };

  useEffect(() => {
    if (isChecked) {
      setChecked(false);
      remove_select_files(caption, id);
    }
  }, [deselectTrigger]);

  return (
    <tr key={id} className={`${isChecked ? 'bg-sky-200' : 'bg-white'} border-b-2`}>
      <label className='grid grid-cols-12'>
        <td className="inline-flex px-2 py-4 font-medium text-gray-900 col-span-1">
          <input type="checkbox" className='w-4' id={id} checked={isChecked} onChange={handleCheckBoxChange} />
        </td>
        <td className="inline-flex px-2 py-4 font-medium text-gray-900 col-span-5">
          <button onClick={handleOpenViewFile} className='flex items-center text-left my-auto gap-6 text-sm hover:text-sky-600'>
            <FileTitle caption={caption} char_lim={30} />
          </button>
        </td>
        <td className="px-2 py-4 text-center col-span-2">
          {filedate}
        </td>
        <td className="px-2 py-4 text-center col-span-2">
          {get_file_size(size)}
        </td>
        <td className='my-auto space-x-2 text-center col-span-2'>
          <a href={fileurl} download>
            <FontAwesomeIcon icon={faDownload} className='text-slate-600 p-3 rounded-full cursor-pointer hover:text-blue-500 hover:bg-gray-200' /></a>
          <FontAwesomeIcon icon={faTrash} onClick={handleOpenDeleteModal} className='text-slate-600 p-3 rounded-full cursor-pointer hover:text-red-600 hover:bg-gray-200' />
        </td>
        <FileModal fileurl={fileurl} file_name={caption} title={<FileTitle caption={caption} char_lim={50} />} open={openFile} close={handleCloseViewFile} />

        <Modal isOpen={deleteFile} onRequestClose={handleCloseDeleteModal} className="grid place-items-center h-full bg-white bg-opacity-10" style={{
          overlay: {
            zIndex: 40
          }
        }}>
          <FileDelete caption = {caption} delete_data = {deleteData} close_modal = {handleCloseDeleteModal}/>
        </Modal>
      </label>
    </tr>
  );
};

export default FileItem;
