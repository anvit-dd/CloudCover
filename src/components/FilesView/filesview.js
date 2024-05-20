import React, { useState, useEffect } from 'react';
import { db } from "../../firebaseinit";
import FileItem from './fileitem';
import FileCard from './filecard';
const FilesView = ({folder_name}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection(`${folder_name}`).onSnapshot(snapshot => {
      const fetchedFiles = snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      }));
      setFiles(fetchedFiles);
    });
    return () => unsubscribe();
  }, []);


  return (
    <div className='w-[85%] ml-auto mt-24'>
      <div className='flex flex-wrap mx-auto mt-4 mb-2 ml-9 justify-start'>
        {
          files.length>0?
        (
          files.slice(0,4).map(({id, item})=>(
            <FileCard key = {id} caption={item.caption} fileurl={item.fileUrl}/>
          ))
        )
        :
        (<p className='mx-auto my-auto text-6xl text-gray-500 font-semibold'>No Files Added</p>)
      }
      </div>
      <div className='relative overflow-x-auto'>
        <table className="w-[100%] text-md text-gray-500">
          <thead className="text-md text-gray-700 bg-slate-50">
                    <tr className='grid grid-cols-11'>
                        <th scope="col" className="p-2  pl-32 mr-auto text-left col-span-6">
                            Name
                        </th>
                        <th scope="col" className="p-2 m-auto text-left col-span-2">
                            Date Added
                        </th>
                        <th scope="col" className="p-2 m-auto rounded-e-lg text-left col-span-2">
                            Size
                        </th>
                        <th className=''></th>
                    </tr>
                </thead>
          </table>
      </div>
      <div className="relative overflow-x-auto overflow-y-scroll">
          <table className="w-full text-md text-gray-500">
              <tbody className='first:bg-slate-400'>
                {files.map(({ id, item }) => (
                    <FileItem
                      key = {id}
                      id = {id}
                      caption={item.caption}
                      fileurl={item.fileUrl}
                      size={item.size}
                      timestamp={item.timestamp}
                      folder_name = {folder_name}
                    />
                ))}
              </tbody>
          </table>
      </div>

    </div>
  );
};

export default FilesView;
