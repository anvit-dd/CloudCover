import React from 'react';
import CloudCoverIcon from '../../media/CloudCover.png';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Modal } from '@material-ui/core';

const Header = ({setSearchQuery, onSignout }) => {
  const [open, setOpen] = React.useState(false);

  const sendQuery = (query) => {
    setTimeout(() => {
      setSearchQuery(query);
    }, 500);
  };

  const handleSignout = () => {
    onSignout();
    setOpen(false);
  };

  return (
    <div className="flex w-[100vw] h-24 bg-slate-50 p-4">
      {/* Logo icon div */}
      <div className="flex items-center justify-start">
        <img className="h-[100%] object-contain" src={CloudCoverIcon} alt="CloudCover Logo" />
        <span className="text-zinc-600 text-2xl ml-3 font-semibold">CloudCover</span>
      </div>
      {/* Search container */}
      <div className="flex-1 items-center p-2">
        <div className="w-[50%] h-[100%] bg-slate-200 p-2 rounded-full items-center py-4 px-4 flex">
          <SearchIcon className="text-slate-600 text-lg" />
          <input type="text" placeholder="Search Here" onChange={(qry) => sendQuery(qry.target.value)} className="flex-1 h-[125%] bg-transparent mx-1 p-2 focus:outline-none text-bold text-black text-lg" />
          <ExpandMoreIcon className="text-slate-600 text-lg" />
        </div>
      </div>
      {/* header icons */}
      <div className="flex items-center">
        <div className="flex items-center mr-5 text-slate-600 gap-3 scale-125">
          <HelpOutlineIcon />
          <SettingsIcon />
          <AppsIcon className='' />
        </div>
        <button onClick={() => setOpen(true)} className='rounded-full hover:bg-slate-300 p-4'>
          <AccountCircleIcon className='text-sky-600 scale-[190%]' />
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center'>
        <div className='flex justify-center items-center w-[400px] h-[100px] bg-white rounded-lg shadow-md '>
          <button onClick={handleSignout} className='bg-blue-500 text-2xl p-4 font-semibold text-white rounded-lg hover:bg-blue-600'>Sign Out</button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
