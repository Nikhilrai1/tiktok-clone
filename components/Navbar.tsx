import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import logo from '../public/utils/tiktik-logo.png'
import { createOrGetUser } from '../public/utils'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { userProfile, addUser} = useAuthStore();
  const user = false;
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
      <div>
        SEARCH
      </div>
      <div>
        {userProfile ? (
          <div>
            {/* {userProfile?.userName} */}
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("error")} />
        )
        }
      </div>
    </div>
  )
}

export default Navbar