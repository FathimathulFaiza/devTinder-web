import React, { useState } from "react";
import axios from "axios"

const Login = () => {

  // These will store what the user types
  const [emailId, setEmailId] = useState("fathimthulfaiza@gmail.com");
  const [password, setPassword] = useState("Faiza@123");

// handle the API call - Axios used (network call)

   const handleLogin = async ()=>{

    try{
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password,
       
      }, { withCredentials: true }  )

    }
    catch(err){
      console.error(err)
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

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;