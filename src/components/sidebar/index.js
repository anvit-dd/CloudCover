import React from 'react'
import NewFile from '../sidebar/Newfile'
import SidebarItem from './SidebarItem'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DvrOutlinedIcon from '@material-ui/icons/DvrOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StorageIndicator from '../sidebar/storage'

function index({folder_name}) {
  return (
      <div className="fixed z-10 mt-24 scroll-none top-0 min-w-[15%] h-[100vh] bg-slate-50 p-4">
        <NewFile className='mx-auto' folder_name = {folder_name}/>
        <div className='mt-6'>
          <SidebarItem icon = {(HomeOutlinedIcon)} label ={"Home"}/>
          <SidebarItem icon = {(DvrOutlinedIcon)} label ={"My Files"}/>
          <SidebarItem icon = {(AccessTimeOutlinedIcon)} label ={"Recent"}/>
          <SidebarItem icon = {(StorageOutlinedIcon)} label ={"Storage"}/>
          <SidebarItem icon = {(DeleteOutlineIcon)} label ={"Trash"}/>
          <StorageIndicator folder_name = {folder_name}/>
        </div>
      </div>
  )
}

export default index