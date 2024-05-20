import { useEffect, useState} from 'react'
import {db} from "../../firebaseinit"
import FileCard from "./filecard"

const Filequerydisplay = ({query, folder_name}) => {

    const [queryfiles, setqueryfiles] = useState([])
    useEffect(()=>{
        db.collection(`${folder_name}`).onSnapshot(snapshot=>{
        const fetchedFiles = snapshot.docs.map(docs=>({
            id:docs.id,
            ...docs.data()
        }))
        const filteredFiles = fetchedFiles.filter((file)=>file.caption.toLowerCase().startsWith(query.toLowerCase()))
        setqueryfiles(filteredFiles)
    })},[query])

    return (
    <div className='w-[85%] ml-auto mt-24'>
        <div className='mb-10'>
            <p className='py-2 pl-2 font-medium text-4xl text-gray-600'>Search Results</p>
            <p className='p-5 pl-2 text-xl text-gray-600'>Found {queryfiles.length} results for "{query}" </p>
        </div>
        <div className='mx-auto mt-4 hidden lg:grid lg:grid-cols-4 md:grid md:grid-cols-3 overflow-scroll'>
          {queryfiles.map(file => (
              <FileCard key={file.fileUrl} fileurl={file.fileUrl} caption={file.caption}/>
          ))}
        </div>
      </div>
  )
}

export default Filequerydisplay
