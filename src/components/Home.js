import {React, useState} from 'react'
import Header from "./header/index"
import SideBar from "./sidebar/index"
import FileView from "./FilesView/filesview"
import FileSearchResults from './FilesView/filequerydisplay'
import { useLocation} from 'react-router-dom';

const Home = () => {
  const email_location = useLocation().state?.userEmail
  const [searchQuery, setSearchQuery] = useState("")
  console.log(searchQuery);
  return (
    email_location!== undefined ?
    (<div>
        <Header setSearchQuery={setSearchQuery}/>
        <div className="flex">
          <SideBar email={email_location}/>

          {
            searchQuery ===""?
            (<FileView/>)
            :
            (<FileSearchResults query={searchQuery}/>)
          }
        </div>
    </div>)
    :
    (window.location = "/")
  )
}

export default Home
