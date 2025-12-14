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

    if(connections.length === 0) return <h1> No Connections Found..! </h1>
  


  return (
    <div className=' text-center my-10'>
        <h1 className='text-bold text-black text-4xl'>Connections</h1>


        {connections.map((connection)=>{
          console.log(connection)
          

          const {_id, firstName, lastName, photoUrl, age, gender, about } = connection

      return (
   <div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
    <div>
      <img  alt="photo"  className='w-20 h-20 rounded-full' src={photoUrl} />
      </div>

      <div className='text-left mx-6'>
        <h2>{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + ", " + gender}</p>}

        <p>{about || "This is a default about the User.."}</p>
        </div>    
          </div>
      )
    })}

  </div>
)
   
}       
     
  


export default Connections