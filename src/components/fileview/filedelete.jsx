import React from 'react'

const FileDelete = ({caption, delete_data, close_modal}) => {
  return (
    <div className='bg-white p-4 w-80 shadow-2xl rounded-lg'>
      <p className='text-center font-semibold text-lg text-red-500'>Delete {caption}?</p>
      <p className='font-light text-center my-3'>This action cannot be undone.</p>
      <div className='flex justify-between mt-2 space-x-6'>
        <button onClick={close_modal} className='bg-white border-2 px-4 rounded-md font-semibold hover:bg-gray-100'>Cancel</button>
        <button onClick={delete_data} className='bg-red-500 text-white px-4 h-10 rounded-md font-semibold hover:bg-red-600'>Confirm & Delete</button>
      </div>
    </div>
  )
}

export default FileDelete
