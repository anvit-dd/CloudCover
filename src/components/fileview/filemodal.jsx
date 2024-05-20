import { useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faDownload } from "@fortawesome/free-solid-svg-icons";
const FileModal = ({ fileurl, file_name, title, open, close }) => {

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        close()
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [close]);
  const isImage = (file_name) => {
    const image_type_arr = ["png", "jpeg", "jpg", 'gif', 'svg', 'webp', "tiff"]
    return(image_type_arr.includes(getFileType(file_name)))
  }
  const getFileType = (file_name) => {
    return file_name.split(".")[1];
  }
  const handleImageDownload = () => {
    const link = document.createElement('a');
    link.href = fileurl;
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  Modal.setAppElement(document.body)
  return (
    <Modal
      isOpen={open} 
      onRequestClose={close}
      shouldCloseOnOverlayClick = {true}
      onClick={close}
      className='grid grid-cols-1 justify-start h-full px-2 bg-black bg-opacity-80'
      style={{
        overlay: {
          zIndex: 40
        }
      }}
    >
      <div className='flex items-center justify-between space-x-2 h-20 px-4'>
        <div className='flex items-center justify-center space-x-2'>
          <button onClick={close}><FontAwesomeIcon icon={faArrowLeftLong} size = "lg" className='my-auto rounded-full text-gray-400 p-2 hover:bg-gray-400 hover:bg-opacity-10'/></button>
          <div className='flex justify-start align-text-top space-x-2 text-gray-50 pt-1'>
            {title}
          </div>
        </div>
        <a href={fileurl} download><FontAwesomeIcon icon={faDownload} size = "xl" className='my-auto rounded-full text-gray-200 p-3 hover:bg-gray-400 hover:bg-opacity-10'/></a>
      </div>
        {isImage(file_name)?
        (<img src={fileurl} className='md-auto mx-auto aspect-auto shadow-sm sm:max-w-md md:max-w-2xl duration-100'/>)
        :
        (<p className='text-center text-6xl text-stone-50 opacity-40'>File preview not available :(</p>)}
    </Modal>
  )
}

export default FileModal;
