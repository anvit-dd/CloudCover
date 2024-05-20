import React from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
export default function SidebarItem({arrow, icon:Icon, label}) {
  return (
    <div className='flex p-4 hover:bg-slate-200 rounded-full'>
      <div className='flex gap-3 text-xl'>
        <Icon className="scale-125 self-center"/>
        <p>{label}</p>
      </div>
    </div>
  )
}
