
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { removeUserFromFeed } from '../utils/feedSlice'


const UserCard = ({user}) => {

  const {_id, firstName, lastName, photoUrl, age, gender, about, skills } = user

    const [error,setError] = useState("")
    const dispatch = useDispatch()

 
 const handleSendRequest = async (status,userId)=>{

    if (!_id) {
      console.error("User _id missing")
      return
    }
  try{
    const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      {withCredentials : true}
    )
    dispatch(removeUserFromFeed(userId))

  }
  catch(err){
      setError(err?.response?.data || "Something Went Wrong..!")

  }
 }

  return (
    <div>
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto
                hover:shadow-2xl hover:scale-105 transition-transform duration-300">
  <figure>
   <div className="w-72 h-72 rounded-full border-4 border-indigo-400 shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
  <img
    src={photoUrl || "/default-avatar.png"}
    alt="photo"
    className="w-full h-full object-contain"
  />
</div>
   
  </figure>
  <div className="card-body">
    <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">
  {firstName} {lastName}
</h2>
<div className="flex flex-wrap justify-center gap-2 mt-2">
  {age && (
    <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
      {age} 🏷️
    </span>
  )}
  {gender && (
    <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
      {gender} 🏷️
    </span>
  )}
  {skills && (
    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
      {skills}
    </span>
  )}
</div>
  {about && (
  <p className="text-gray-600 text-sm text-center mt-3 line-clamp-3">
    {about}
  </p>
)}
    <div className="card-actions justify-center my-6">
      <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-secondary " onClick={()=> handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard