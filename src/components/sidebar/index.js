import React from 'react'
import NewFile from '../sidebar/Newfile'
import SidebarItem from './SidebarItem'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DvrOutlinedIcon from '@material-ui/icons/DvrOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import StorageIndicator from '../sidebar/storage'

function index({folder_name}) {
  return (
      <div className="w-[15%] h-[90vh] bg-slate-50 p-4">
        <NewFile folder_name = {folder_name}/>
        <div className='mt-6 ml-4'>
          <SidebarItem icon = {(HomeOutlinedIcon)} label ={"Home"}/>
          <SidebarItem icon = {(DvrOutlinedIcon)} label ={"My Files"}/>
          <SidebarItem icon = {(AccessTimeOutlinedIcon)} label ={"Recent"}/>
          <SidebarItem icon = {(StorageOutlinedIcon)} label ={"Storage"}/>
          <StorageIndicator folder_name = {folder_name}/>
        </div>
      </div>
  )
}

export default index