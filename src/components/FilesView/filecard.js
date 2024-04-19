import React from 'react'
import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DocumentIcon from '@material-ui/icons/Description';
import ExcelIcon from '@material-ui/icons/TableChart';
import CodeIcon from '@material-ui/icons/Code';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const filecard = ({caption, fileurl}) => {
  const char_lim = 20
  const file_type = caption.split(".")[1]
  const image_type_arr = ["png", "jpeg", "jpg", 'gif', 'svg', 'webp', "tiff"]
  const isImage = image_type_arr.includes(file_type)
  const doc_map = {
    "pdf":<PictureAsPdfIcon className='text-red-600'/>,
    "doc": <DocumentIcon className='text-blue-500'/>,
    "docx": <DocumentIcon className='text-blue-500'/>,
    "xlsx": <ExcelIcon className='text-green-500'/>,
    "csv": <ExcelIcon className = 'text-green-500'/>,
    "exe":<CodeIcon className='text-red-600'/>,
    "default":<InsertDriveFileIcon/>
  }
  return (
    <div className='mr-4 mb-2 p-2 rounded-lg w-[300px] h-[348.75px] shadow-sm bg-slate-100 text-zinc-700 hover:shadow-xl ease-in-out duration-75 hover:bg-slate-200'>
      <a href={fileurl} target="_blank" rel="noreferrer" download className='w-[100%]'>
        <div className='flex items-center mb-2'>
          {
            isImage?
            (<ImageIcon className='absolute text-red-600'/>)
            :
            (
              file_type in doc_map?
              (<div className='absolute'>{doc_map[file_type]}</div>)
              :
              (<div className='absolute'>{doc_map['default']}</div>)
            )
          }
          {caption.length > char_lim ?
                (<p className='w-[100%] text-center font-semibold text-lg mx-8'>{caption.slice(0, char_lim) + "..."}</p>)
                :
                (<p className='w-[100%] text-center font-semibold text-lg mx-8'>{caption}</p>)
          }
        </div>
        <div>
          {
            isImage?
            (<img src = {fileurl} alt = {caption} className='w-[300px] h-[300px] aspect-square object-cover rounded-lg my-auto'/>)
            :
            (
              <div className='flex items-center justify-center mt-28 m-auto w-max scale-[500%]'>
                {
                  file_type in doc_map?
                  (doc_map[file_type])
                  :
                  (doc_map["default"])
                }
              </div>
            )
          }
        </div>
      </a>
    </div>
  )
}

export default filecard
