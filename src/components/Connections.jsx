import axios from 'axios'

import { BASE_URL } from '../utils/constants'
import { useEffect, useState } from 'react'
import { addConnections } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {

  const connections = useSelector((store) => store.connections)

  const dispatch = useDispatch()


  const [error, setError] = useState("") 
   
    const fetchConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections",
                {withCredentials : true}
              
            )
            
              dispatch(addConnections(res.data.data))

        }
        catch(err){
      setError(err?.response?.data || "Something Went Wrong..!")

        }
    }


    useEffect(()=>{
        fetchConnections()
    },[])


    if(!connections) return null
if (connections.length === 0)
  return (
    <div className="flex flex-col items-center justify-center mt-24 text-gray-600">
      <h2 className="text-3xl font-semibold mb-2">
        No Connections Yet 🤝
      </h2>
      <p className="text-gray-500">
        Start connecting with people to see them here.
      </p>
    </div>
  );
  


  return (
  <div className="min-h-screen bg-gray-50 py-10">
       <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
  Connections
</h1>

        {connections.map((connection)=>{
          console.log(connection)
          

          const {_id, firstName, lastName, photoUrl, age, gender, about } = connection

      return (
<div
  key={_id}
  className="flex items-center gap-6 bg-white shadow-md rounded-xl p-5 w-full max-w-2xl mx-auto mb-6
             hover:shadow-xl hover:scale-[1.02] transition duration-300"
>
<div>
        <div 
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md"
        >
            <img
                alt={`${firstName} ${lastName}'s photo`}
                src={photoUrl}
                className="w-full h-full object-cover" 
            />
        </div>
    </div>

      <div className='text-left mx-6'>
<h2 className="text-lg font-semibold text-gray-800">
  {firstName} {lastName}
</h2>

        <div className="flex gap-2 mt-1">
  {age && (
    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">
      {age} 🏷️
    </span>
  )}
  {gender && (
    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-medium">
      {gender} 🏷️
    </span>
  )}
</div>

<p className="text-sm text-gray-600 mt-2">
  {about || "This is a default about the user."}
</p>
        </div>    
          </div>
      )
    })}

  </div>
)
   
}       
     
  


export default Connections