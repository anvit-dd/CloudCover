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

  const handleSignout = () => {
    userEmail = ""
    window.location = "/";
  };

  return (
    userEmail ? (
      <div>
        <Header setSearchQuery={setSearchQuery} onSignout={handleSignout} />
        <div className="flex">
          <SideBar />
          {searchQuery === "" ? <FileView /> : <FileSearchResults query={searchQuery} />}
        </div>
      </div>
    ) : (
      // Redirect to sign-in page if user is not authenticated
      window.location = "/"
    )
  );
};

export default Home;
