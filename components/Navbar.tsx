import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/utils/tiktik-logo.png'
const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
    <div className='w-[100px] md:w-[130px]'>
      <Image 
      src={logo}
      alt="logo"
      layout='responsive'
      className="cursor-pointer"
      />
    </div>
      </Link>
    </div>
  )
}

export default Navbar