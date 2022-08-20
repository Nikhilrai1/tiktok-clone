import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, [])
  if (isSSR) return null;
  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="overflow-hidden xl:hover:overflow-auto h-[92vh]">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-10 mt-4 overflow-auto h-[88vh] videos flex-1">
        <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
