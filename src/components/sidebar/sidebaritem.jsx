export default function SidebarItem({icon, label}) {
  return (
    <div className='flex gap-3 text-sm items-center lg:text-lg md:text-sm'>
      <p className="text-xl md:text-lg">{icon}</p>
      <p className="hidden md:block">{label}</p>
    </div>
  )
}
