import React, { useState } from 'react';
import Header from "./header/index";
import SideBar from "./sidebar/index";
import FileView from "./FilesView/filesview";
import FileSearchResults from './FilesView/filequerydisplay';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  let userEmail = location.state?.userEmail;
  const [searchQuery, setSearchQuery] = useState("");
  const get_folder_name = (userEmail)=>{
    if(userEmail === "")
    {
      return null
    }
    return (userEmail.split("@")[0])
  }

  const handleSignout = () => {
    userEmail = ""
    window.location = "/";
  };

  return (
    userEmail ? (
      <div className='h-screen'>
        <Header setSearchQuery={setSearchQuery} onSignout={handleSignout} />
        <div className="flex">
          <SideBar folder_name = {get_folder_name(userEmail)}/>
          {searchQuery === "" ? 
          <FileView folder_name = {get_folder_name(userEmail)} />
          : 
          <FileSearchResults query={searchQuery} folder_name= {get_folder_name(userEmail)}/>}
        </div>
      </div>
    ) : (
      // Redirect to sign-in page if user is not authenticated
      window.location = "/"
    )
  );
};

export default Home;
