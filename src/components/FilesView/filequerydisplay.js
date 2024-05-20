import {React, useEffect, useState} from 'react'
import {db} from "../../firebaseinit"
import FileCard from "../FilesView/filecard"

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
        <div className='flex flex-wrap mb-5 m-5'>
            {queryfiles.map(file => (
                <FileCard fileurl={file.fileUrl} caption={file.caption}/>
            ))}
        </div>
    </div>
  )
}

export default Filequerydisplay
