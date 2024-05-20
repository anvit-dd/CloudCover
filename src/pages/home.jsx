import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/header/header";
import SideBar from "../components/sidebar/sidebar";
import FileView from "../components/fileview/fileview";
import FileSearchResults from '../components/fileview/filequerydisplay';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mailid, setMailid] = useState(location.state?.userEmail || "");
  const [searchQuery, setSearchQuery] = useState("");

  const get_folder_name = () => {
    if (mailid === "") {
      return null;
    }
    return mailid.split("@")[0];
  }

  const handleSignout = () => {
    setMailid("");
    navigate("/", {replace:true});
  };

  useEffect(() => { 
    if (mailid === "" && location.pathname == "/home") {
      navigate("/");
    }
  }, [mailid, location.pathname, navigate]);//do not touch

  return mailid ? (
    <div className='h-screen'>
      <Header setSearchQuery={setSearchQuery} onSignout={handleSignout}/>
      <div className="flex">
        <SideBar folder_name={get_folder_name()} />
        {searchQuery === "" ?
          <FileView folder_name={get_folder_name()} />
          :
          <FileSearchResults query={searchQuery} folder_name={get_folder_name()} />
        }
      </div>
    </div>
  ) : navigate("/");
};

export default Home;
