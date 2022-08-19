import axios from 'axios'
import type { NextPage } from 'next'
import { Videos } from '../types'

interface IProps {
  videos: Videos[]
}
const Home  = ( {videos}: IProps) => {
  // console.log(videos)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">

    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const {data} = await axios.get("http://localhost:3000/api/post");
  console.log(data)
  return {
    props: {
      videos: data
    }, // will be passed to the page component as props
  }
}
