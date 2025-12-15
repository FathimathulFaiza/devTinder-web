import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {

  const requests = useSelector((store)=> store.requests)
  const dispatch = useDispatch()
  const [error,setError] = useState("")
 

  const reviewRequest = async (status, _id) =>{
    try{
      const res =  await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {withCredentials : true}
      )
      dispatch(removeRequest(_id))

    }
    catch(err){
       setError(err?.response?.data || "Something Went Wrong..!")
    }
  }

  const fetchRequests = async ()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/requests/recieved", 
       { withCredentials : true }
      )
      dispatch(addRequests(res.data.data))

    }
    catch(err){ 
         setError(err?.response?.data || "Something Went Wrong..!")

    }
  }

useEffect(()=>{
  fetchRequests()
},[])


          if(!requests) return null

    if(requests.length === 0) return <h1 className='flex justify-center my-10 text-bold'> No Requests Found..! </h1>
    


  return (
    <div className=' text-center my-10 '>
        <h1 className='text-bold   text-black text-4xl '>Connections Requests</h1>


        {requests.map((request)=>{
         
          const {_id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId

      return (
   <div key={_id} className='flex justify-between items-center m-4 p-6 rounded-2xl bg-white shadow-lg w-full max-w-2xl mx-auto
                         hover:shadow-2xl hover:scale-105 transition-transform duration-300'>
    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md flex items-center justify-center bg-gray-100">
<div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-400">
  <img
    src={photoUrl}
    alt="photo"
    className="w-full h-full object-cover"
  />
</div>
</div>

      <div className='text-left mx-6'>
      <h2 className="text-xl font-bold text-gray-800">
  {firstName + " " + lastName}
</h2>

<div className="flex gap-2 mt-1">
  {age && (
    <span className="bg-gradient-to-r from-indigo-200 to-indigo-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm
                     hover:scale-105 hover:from-indigo-300 hover:to-indigo-500 transition-all duration-200">
      {age} 🏷️
    </span>
  )}
  {gender && (
    <span className="bg-gradient-to-r from-pink-200 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm
                     hover:scale-105 hover:from-pink-300 hover:to-pink-500 transition-all duration-200">
      {gender} 🏷️
    </span>
  )}
</div>

<p className="text-sm text-gray-500 mt-2 line-clamp-3">
  {about || "This is a default about the User.."}
</p>
        </div>  
        <div><div className='flex flex-col'>
  <button 
    className="btn btn-primary mx-2 my-1 hover:scale-105 transition-transform duration-200"
    onClick={()=> reviewRequest("rejected", request._id)}
  >
    Reject
  </button>

  <button 
    className="btn btn-secondary mx-2 my-1 hover:scale-105 transition-transform duration-200"
    onClick={()=> reviewRequest("accepted", request._id)}
  >
    Accept
  </button>
</div>
          </div>  
          </div>
      )
    })}

  </div>
)
}


export default Requests