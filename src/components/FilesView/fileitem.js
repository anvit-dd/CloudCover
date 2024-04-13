import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from "../../firebaseinit";


const FileItem = ({ id, caption, timestamp, fileurl, size }) => {
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
      db.collection('myFiles').doc(id).delete()
      alert("File removed")
    }
    catch(error){
      alert("Error Occured")
    }
  }

  return (
    <tr key={id} className="bg-white border-b-2">
      <td className='px-5 text-center'>
        <button onClick={handleData} className='p-2 text-center rounded-full hover:bg-slate-200 hover:text-red-600'><DeleteIcon /></button>
      </td>
      <td className="inline-flex px-2 py-4 font-medium text-gray-900 text-left">
        <a href={fileurl} target="_blank" rel="noreferrer" download className='flex items-center font-medium'>
          <div className="flex-1 items-center h-[100%] flex hover:text-sky-600">
            <InsertDriveFileIcon className='text-slate-700 mr-2' />
            {caption.length > char_lim ?
              (<span>{caption.slice(0, char_lim) + caption.slice(-5, -1)}</span>)
              :
              (<span>{caption}</span>)
            }
          </div>
        </a>
      </td>
      <td className="px-6 py-4 text-center">
        {filedate}
      </td>
      <td className="px-6 py-4 text-center">
        {get_file_size(size)}
      </td>
    </tr>
  );
};

export default FileItem;
