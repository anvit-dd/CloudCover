import React from 'react';
import CloudCoverIcon from '../../media/CloudCover.png';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';

const Index = ({userPhoto}) => {
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
          <input type="text" placeholder="Search Here" className="flex-1 h-[125%] bg-transparent mx-1 p-2 focus:outline-none text-bold text-black text-lg" />
          <ExpandMoreIcon className="text-slate-600 text-lg" />
        </div>
      </div>
      {/* header icons */}
      <div className="flex items-center">
        <div className="flex items-center mr-8 text-slate-600 gap-3 scale-125">
          <HelpOutlineIcon/>
          <SettingsIcon/>
          <AppsIcon/>
        </div>
        <img className='w-12 rounded-full' src={userPhoto} alt = "User icon"/>
      </div>
    </div>
  );
};

export default Index;
