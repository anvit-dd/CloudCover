import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from "../../firebaseinit";


const FileItem = ({ id, caption, timestamp, fileurl, size, folder_name }) => {
  const month_arr = ["Jan", "Feb", 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const filedate = `${timestamp?.toDate().getDate()} ${month_arr[timestamp?.toDate().getMonth()]} ${timestamp?.toDate().getFullYear()}`;
  const char_lim = 70;

  const get_file_size = (file_size_bytes) => {
    const file_size = ["Bytes", "kB", "MB", "Gb"];
    let i = 0;
    while (file_size_bytes > 1024) {
      file_size_bytes /= 1024;
      i++;
    }
    return `${file_size_bytes.toFixed(2)} ${file_size[i]}`;
  };

  const handleData = ()=>{
    deleteData(id)
  }
  const deleteData = (fileid)=>
  {
    try{
      db.collection(folder_name).doc(id).delete()
      alert("File removed")
    }
    catch(error){
      alert("Error Occured")
    }
  }

  return (
    <tr key={id} className="bg-white border-b-2 grid grid-cols-11">
      <td className="inline-flex px-2 py-4 font-medium text-gray-900o col-span-6">
        <a href={fileurl} target="_blank" rel="noreferrer" download className='flex items-center font-medium'>
          <div className="items-center w-[100%] h-[100%] flex ml-4 hover:text-sky-600">
            <InsertDriveFileIcon className='text-slate-700 mr-2' />
            {caption.length > char_lim ?
              (<span>{caption.slice(0, char_lim) + caption.slice(-5, -1)}</span>)
              :
              (<span>{caption}</span>)
            }
          </div>
        </a>
      </td>
      <td className="px-2 py-4 text-center col-span-2">
        {filedate}
      </td>
      <td className="px-2 py-4 text-center col-span-2">
        {get_file_size(size)}
      </td>
      <td className='px-5 col-span-1'>
        <button onClick={handleData} className='p-2 text-center rounded-full hover:bg-slate-200 hover:text-red-600'><DeleteIcon /></button>
      </td>
    </tr>
  );
};

export default FileItem;
