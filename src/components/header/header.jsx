import {useState} from 'react';

import CloudCoverIcon from '../../assets/CloudCover.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleQuestion, faGear, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';

const Header = ({setSearchQuery, onSignout }) => {
  const [open, setOpen] = useState(false);
  const sendQuery = (query) => {
    setTimeout(() => {
      setSearchQuery(query);
    }, 500);
  };

  const handleSignout = () => {
    onSignout();
    setOpen(false);
  };
  Modal.setAppElement(document.body)
  return (
    <div className="fixed z-10 flex w-[100vw] h-20 bg-slate-50 p-1">
      <div className="flex items-center justify-start w-[15%] p-2">
        <img className="h-[100%] object-contain" src={CloudCoverIcon} alt="CloudCover Logo" />
        <span className="text-zinc-600 text-2xl ml-3 font-semibold">CloudCover</span>
      </div>
      <div className="flex-1 items-center p-2 w-[50%] h-auto">
        <div className="w-[65%] h-[100%] bg-slate-200 mx-auto p-2 rounded-full items-center py-4 px-4 flex">
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-slate-600'/>
          <input type="text" placeholder="Search Here..." onChange={(qry) => sendQuery(qry.target.value)} className="flex-1 h-[125%] bg-transparent mx-1 p-2 focus:outline-none text-bold text-black text-lg" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-5 text-slate-600 gap-2">
          <button><FontAwesomeIcon icon={faCircleQuestion} className='text-slate-600 rounded-full p-2 hover:bg-slate-300' size='xl'/></button>
          <button><FontAwesomeIcon icon={faGear} className='text-slate-600 rounded-full p-2 hover:bg-slate-300' size='xl'/></button>
          <button onClick={()=>{setOpen(true)}} className='rounded-full hover:bg-slate-300 p-2'>
            <FontAwesomeIcon icon={faCircleUser} size='2xl' className='text-blue-600'/>
          </button>
        </div>
      </div>
      <Modal isOpen={open} onRequestClose = {()=>setOpen(false)} className='flex justify-center items-center h-[100vh]' style={{overlay:{zIndex:30}}}>
        <div className='p-4 bg-white rounded-lg shadow'>
          <div>
            <span className='flex items-center justify-center'>Would you like to Logout?</span>
            <div className='flex gap-8 mt-4'>
              <button onClick={()=>setOpen(false)} className='border-2 p-2 rounded-lg px-4 py-2 hover:bg-gray-200'>Cancel</button>
              <button onClick={handleSignout} className='bg-red-500 p-2 px-4 py-2 font-semibold text-white rounded-lg hover:bg-red-600'>Logout</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;