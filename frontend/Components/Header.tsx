import React from 'react'
import Image from 'next/image'
interface HeaderProps {
  showModalLogin :boolean,
  setShowModalLogin : (b:boolean) => void
}
const Header = ({showModalLogin,setShowModalLogin}:HeaderProps) => {
  return (
    <div className='flex-between content h-[80px] mb-3 '>
      <div className="flex-center space-x-4 ">
        <Image src={"/icon/icon-CMND-CCCD-400x400.png"} alt='main_icon' width={80} height={80} className='rounded-md' />
        <span className="font-bold text-32 hover:scale-125 hover:skew-y-12 hover:rotate-9 text-[#17CDEA]">2Fast</span>
      </div>
      <div className='p-2'>
        <button className='px-6 py-3 rounded-md bg-oy text-white hidden' onClick={(e)=>setShowModalLogin(true)}>Login</button>
      </div>
    </div>
  )
}

export default Header
