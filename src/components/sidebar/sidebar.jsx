import NewFile from '../sidebar/newfile'
import SidebarItem from './sidebaritem'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBoxArchive, faClock, faCloud, faTrash} from "@fortawesome/free-solid-svg-icons";
import StorageBar from './storagebar'

function index({folder_name}) {
  const navigate = useNavigate()
  const handleTrash = ()=>{
  }
  return (
      <div className="fixed z-10 mt-20 scroll-none top-0 w-[14vw] h-[100vh] bg-slate-50 p-4">
        <NewFile className='mx-auto' folder_name = {folder_name}/>
        <div className='mt-6'>
          <button className='flex p-4 hover:bg-slate-200 rounded-full md:w-full'><SidebarItem icon = {<FontAwesomeIcon icon={faHouse} className='text-slate-600'/>} label ={"Home"}/></button>
          <button className='flex p-4 hover:bg-slate-200 rounded-full md:w-full'><SidebarItem icon = {<FontAwesomeIcon icon={faClock} className='text-slate-600'/>} label ={"Recent"}/></button>
          <button className='flex p-4 hover:bg-slate-200 rounded-full md:w-full'><SidebarItem icon = {<FontAwesomeIcon icon={faCloud} className='text-slate-600'/>} label ={"Storage"}/></button>
          <button onClick={handleTrash} className='flex p-4 hover:bg-slate-200 rounded-full md:w-full'><SidebarItem icon = {<FontAwesomeIcon icon={faTrash} className='text-slate-600'/>} label ={"Trash"}/></button>
          <StorageBar folder_name = {folder_name}/>
        </div>
      </div>
  )
}

export default index