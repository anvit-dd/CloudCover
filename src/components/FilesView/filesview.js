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
      <div className='flex mb-5 m-5 justify-start'>
        {
          files.length>0?
        (
          files.slice(0,4).map(({id, item})=>(
            <FileCard caption={item.caption} fileurl={item.fileUrl}/>
          ))
        )
        :
        (<p className='mx-auto my-auto text-6xl text-gray-500 font-semibold'>No Files Added</p>)
      }
      </div>
      <div className='relative overflow-x-auto'>
      <table className="w-full text-md text-gray-500">
        <thead className="text-md text-gray-700 bg-slate-50">
                  <tr>
                      <th className='w-[5%]'></th>
                      <th scope="col" className="px-32 py-3 rounded-s-lg text-left">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date Added
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                          Size
                      </th>
                  </tr>
              </thead>
        </table>
      </div>
      <div className="relative overflow-x-auto overflow-y-scroll">
          <table className="w-full text-md text-gray-500">
              <tbody className='first:bg-slate-400'>
                {files.map(({ id, item }) => (
                    <FileItem
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
