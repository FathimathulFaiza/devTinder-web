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
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true)

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
      
      dispatch(addUser(res.data.data))
      return navigate("/")

    }
    catch(err){
      setError(err?.response?.data || "Something Went Wrong..!")
     
    }
   }


   const handleSignUp = async ()=>{
    try{

      const res = await axios.post(BASE_URL + "/signup",
        {firstName, lastName, emailId, password },
        {withCredentials : true}
      )
      dispatch(addUser(res.data.data))
      return navigate("/profile")

    }
    catch(err){
      setError(err?.response?.data || "Something Went Wrong..!")

    }
   }

  return (
   <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="card w-96 
bg-white/70 backdrop-blur-lg 
shadow-2xl rounded-2xl border border-white/40">
        <div className="card-body">
         <h2 className="card-title justify-center text-2xl font-bold text-indigo-600">{isLoginForm ? "Login" : "Sign Up"}</h2>

          <div>
      
            { !isLoginForm && 
              <>
             {/* First Name */}
             <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="Type your First name here"
                value={firstName}   // show the value
                onChange={(e) => setFirstName(e.target.value)} // update the value
              />
            </fieldset>


            {/* Last Name */}
         
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
             className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="Type your Last name here"
                value={lastName}   // show the value
                onChange={(e) => setLastName(e.target.value)} // update the value
              />
            </fieldset>  </>}

            {/* Email */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
             className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
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
               className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="Type your Password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
        {error && (
  <p className="text-red-500 text-sm text-center mt-2">
    {error}
  </p>
)}
          <div className="card-actions justify-center">
           <button className="btn w-full 
bg-gradient-to-r from-indigo-500 to-pink-500 
text-white border-0 
hover:scale-[1.02] transition-transform duration-200" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
            
           <p className="m-auto cursor-pointer py-2 
text-sm text-indigo-600 hover:underline text-center" onClick={()=> setIsLoginForm((value) => !value )}> 
              {isLoginForm ? "Existing User ? Sign Up Here  "
            : "Existing User ? Login Here" } </p>

        </div>
      </div>
    </div>
  );
};

export default Login;