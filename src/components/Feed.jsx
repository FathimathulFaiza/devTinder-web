import axios from 'axios'
import React, { useEffect,useState} from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector} from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


const Feed = () => {

  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
   const [error,setError] = useState("")

const getFeed = async ()=>{

if (!Array.isArray(feed) || feed.length > 0) return;

  //if(feed.length > 0) return
try{
  const res = await axios.get(BASE_URL + "/feed",
    {withCredentials : true}
  )

  dispatch(addFeed(res?.data?.data))
}
catch(err){
  setError(err?.response?.data || "Something Went Wrong..!")

}
}

useEffect(()=>{
  getFeed()
},[])

if(!feed) return null

if(feed.length === 0) return <h1 className='flex justify-center my-10 text-bold'>No New User's Found..!</h1>

  return (
    feed &&(
<div className="min-h-screen bg-gray-50 py-10">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-6 tracking-wide animate-fadeIn font-mono">
  Code. Connect. Collaborate.
</h2>
  <div className='flex justify-center'>
    <UserCard user={feed[0]} />
  </div>
</div>
  )
  )
}
export default Feed