import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { client } from '../public/utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../public/utils/constants';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { useRouter } from 'next/router';

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState("");
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null);
    const {userProfile} : { userProfile: any} = useAuthStore();
    const router = useRouter();


    // upload video logic
    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setVideoAsset(data);
                setIsLoading(false)
            })
        }
        else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }

    // handlepost logic
    const handlePost = async () => {
        if(caption && videoAsset?._id && category){
            setSavingPost(true);
            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'refrence',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }
            await axios.post('http://localhost:3000/api/post',document)
            router.push('/')
        }

    }
    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between w-[60%] items-center p-14 pt-6">
                <div className="">
                    <div className="">
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
                    </div>
                    <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video src={videoAsset.url}
                                            loop controls
                                            className='rounded-xl h-[450px] mt-16 bg-black'
                                        >

                                        </video>
                                    </div>
                                ) : (
                                    <label htmlFor=""
                                        className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'> <FaCloudUploadAlt className="text-gray-300 text-6xl" /> </p>
                                                <p className='text-xl font-semibold'>Upload video</p>
                                            </div>
                                            <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                MP$ or WebM or ogg <br />
                                                720x1280 or higher <br />
                                                Up to 10 minutes <br />
                                                Less than 2GB
                                            </p>
                                            <p onClick={() => fileRef.current?.click()} className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                                                Select File
                                            </p>
                                        </div>
                                        <input ref={fileRef} type="file" name="upload-video" onChange={uploadVideo} className="w-0 h-0" />
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType && (
                            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                                Please select a video file
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-3 pb-10'>
                    <label className='text-md font-medium' htmlFor="">
                        Caption
                    </label>
                    <input type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="rounded outline-none text-md border-2 border-gray-200 p-2"
                    />
                    <label className='text-md font-medium' htmlFor="">
                        Choose a Category
                    </label>
                    <select name="category" onChange={(e) => setCategory(e.target.value)}
                    className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                    >
                        {topics.map((topic) => (
                            <option 
                            key={topic.name}
                            value={topic.name}
                            className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-6 mt-10">
                        <button
                        onClick={() => {}}
                        type="button"
                        className='border-gray-300 border-2 text-md font-medium p-2 rounded w-29 lg:w-44 outline-none'
                        >
                            Discard
                        </button>
                        <button
                        onClick={handlePost}
                        type="button"
                        className='bg-[#F51997] text-md font-medium p-2 rounded w-29 lg:w-44 outline-none'
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload