import axios from 'axios'
import type { NextPage } from 'next'
import NoResults from '../components/NoResults'
import VideoCard from '../components/VideoCard'
import { BASE_URL } from '../public/utils'
import { Video } from '../types'

interface IProps {
  videos: Video[]
}
const Home  = ( {videos}: IProps) => {
  // console.log(videos)
  return (
    <div className="flex flex-col gap-10 videos h-full">
    {videos.length ? (
      videos.map((video: Video) => (
        <VideoCard post={video} key={video._id} />
      ))
    ): (
      <NoResults text={"No videos"}/>
    )
  }
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const {data} = await axios.get(`${BASE_URL}api/post`);
  console.log(data)
  return {
    props: {
      videos: data
    }, // will be passed to the page component as props
  }
}
