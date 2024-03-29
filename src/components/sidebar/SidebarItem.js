import React from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
export default function SidebarItem({arrow, icon:Icon, label}) {
  return (
    <div className='p-4 hover:bg-slate-200 rounded-full'>
      <div>
        {arrow && <ArrowRightIcon/>}
      </div>
      <div className='flex gap-3 text-xl'>
        <Icon className="scale-125"/>
        <p>{label}</p>
      </div>
    </div>
  )
}
