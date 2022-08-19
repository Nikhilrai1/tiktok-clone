import React, { useState } from 'react'
import { ImCancelCircle } from 'react-icons/im';
import Link from 'next/link';
import { AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import GoogleLogin from 'react-google-login';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const normalLink = 'flex items-center gap-3 hover:bg-gray-100 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const [userProfile, setUserProfile] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-center xl:hidden m-2 mt-3 cursor-pointer" onClick={() => setShowSidebar((prev) => !prev)}>

        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && <div className="xl:w-400 flex flex-col justify-start mb-1 border-gray-100 xl:border-0 p-3">
        <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
          <Link href="/">
            <div className={normalLink}>
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className='text-2xl hidden xl:block'>For You</span>
            </div>
          </Link>
        </div>
      </div>
      }
      {
        !userProfile && (
          <div className="px-2 py-4 hidden xl:block">
            <p className="text-gray-400">
              Login to like and comment on videos
            </p>
            <div className="pr-4">
              <GoogleLogin
                clientId=''
                render={renderProps => (
                  <button
                    className='bg-white cursor-pointer text-lg text-[#F51997] font-semibold px-6 
                  border-[1px] border-[#F51997] py-3 rounded-md outline-none 
                  w-full mt-3 hover:text-white
                  hover:bg-[#F51997]'
                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Login
                  </button>
                )}
                onSuccess={() => { }}
                onFailure={() => { }}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        )}
      { showSidebar && (
        <>
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </>
      )

      }
    </div>
  )
}

export default Sidebar
// import React, { useState } from 'react';
// import { NextPage } from 'next';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
// import { ImCancelCircle } from 'react-icons/im';

// import SuggestedAccounts from './SuggestedAccounts';
// import Discover from './Discover';
// import Footer from './Footer';
// // import useAuthStore from '../store/authStore';
// const Sidebar: NextPage = () => {
//   const [showSidebar, setShowSidebar] = useState<Boolean>(true);
//   const { pathname } = useRouter();
//   // const { fetchAllUsers, allUsers }: any = useAuthStore();

//   const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

//   const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

//   return (
//     <div>
//       <div
//         className='block xl:hidden m-2 ml-4 mt-3 text-xl'
//         onClick={() => setShowSidebar(!showSidebar)}
//       >
//         {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
//       </div>
//       {showSidebar && (
//         <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
//           <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
//             <Link href='/'>
//               <div className={pathname === '/' ? activeLink : normalLink}>
//                 <p className='text-2xl'>
//                   <AiFillHome />
//                 </p>
//                 <span className='capitalize text-xl hidden xl:block'>
//                   For You
//                 </span>
//               </div>
//             </Link>
//           </div>
          
//           <Discover />
//           <SuggestedAccounts/>
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;