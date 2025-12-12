import React, { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  // These will store what the user types
  const [emailId, setEmailId] = useState("fathimthulfaiza@gmail.com");
  const [password, setPassword] = useState("Faiza@123");
  const [error,setError] = useState("")
  const dispatch = useDispatch()
   const navigate = useNavigate()


// handle the API call - Axios used (network call)

   const handleLogin = async ()=>{
   

    try{
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
       
      }, { withCredentials: true }  )
      
      dispatch(addUser(res.data))
      return navigate("/")

    }
    catch(err){
      setError(err?.response?.data || "Something Went Wrong..!")
     
    }
   }


  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <div>
            {/* Email */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                placeholder="Type your Email ID here"
                value={emailId}   // show the value
                onChange={(e) => setEmailId(e.target.value)} // update the value
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type your Password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
         <p className="text-red-500"> {error} </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;