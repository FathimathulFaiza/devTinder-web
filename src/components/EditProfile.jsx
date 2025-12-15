
import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({ user }) => {

      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
      const [age, setAge] = useState(user.age || "");
      const [gender, setGender] = useState(user.gender || "");
      const [about, setAbout] = useState(user.about || "");
      const [error,setError] = useState("")
      const dispatch = useDispatch()
      const [showToast,setShowToast] = useState(false)

// save the edit profile
      const saveProfile = async()=> {
// clear the old error befor saving
        setError("")

        try{
            const res = await axios.patch(BASE_URL + "/profile/edit",{
               
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            
            }, 
            {withCredentials : true})

            dispatch(addUser(res?.data?.user))
            setShowToast(true)

            setTimeout(()=>{
                setShowToast (false)
            },3000)

        }
        catch(err){
            setError(err.response.data)
        }
      }



  return (

   <> <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex justify-center py-10">
    <div>
          <div className="flex justify-center mx-10">
     <div className="card bg-base-100 w-96 shadow-xl rounded-2xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <div>
            {/* firstName */}
            <fieldset className="fieldset w-full">
             <legend className="fieldset-legend text-sm font-semibold text-gray-600 tracking-wide">
  First Name
</legend>
              <input
                type="text"
             className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="enter your First Name here"
                value={firstName}   // show the value
                onChange={(e) => setFirstName(e.target.value)} // update the value
              />
            </fieldset>
    {/* LastName */}
                 <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-sm font-semibold text-gray-600 tracking-wide">
  Last Name
</legend>
              <input
                type="text"
             className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="enter your Last Name here"
                value={lastName}   // show the value
                onChange={(e) => setLastName(e.target.value)} // update the value
              />
            </fieldset>

                  {/* photoUrl */}

                <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-sm font-semibold text-gray-600 tracking-wide">
  Photo URL
</legend>
              <input
                type="text"
            className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="add your photo here"
                value={photoUrl}   // show the value
                onChange={(e) => setPhotoUrl(e.target.value)} // update the value
              />
            </fieldset>
          

             {/* Age */}
       
           <fieldset className="fieldset w-full">
             <legend className="fieldset-legend text-sm font-semibold text-gray-600 tracking-wide">
Age 
</legend>
              <input
                type="text"
          className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                placeholder="enter your Age here"
                value={age}   // show the value
                onChange={(e) => setAge(e.target.value)} // update the value
              />
            </fieldset>




             {/* Gender */}


               <fieldset className="fieldset w-full">
 <legend className="fieldset-legend text-sm font-semibold text-gray-600 tracking-wide">
Gender
</legend>

  <details className="dropdown w-full">
    <summary className="btn btn-outline w-full justify-between rounded-xl">
      {gender
        ? gender.charAt(0).toUpperCase() + gender.slice(1)
        : "Select Gender"}
      <span>⬇️</span>
    </summary>

    <ul className="menu dropdown-content bg-base-100 rounded-xl w-full p-2 shadow-lg mt-1">
      <li>
        <button
          type="button"
          className="hover:bg-base-200 rounded-lg"
          onClick={() => setGender("male")}
        >
          Male
        </button>
      </li>
      <li>
        <button
          type="button"
          className="hover:bg-base-200 rounded-lg"
          onClick={() => setGender("female")}
        >
          Female
        </button>
      </li>
      <li>
        <button
          type="button"
          className="hover:bg-base-200 rounded-lg"
          onClick={() => setGender("others")}
        >
          Others
        </button>
      </li>
    </ul>
  </details>
</fieldset>



             {/* About */}

             
<fieldset className="fieldset w-full">
 <legend className="fieldset-legend text-sm font-semibold text-gray-600 tracking-wide">
About
</legend>
<textarea
  className="textarea textarea-bordered w-full h-28 resize-none
             focus:ring-2 focus:ring-indigo-400 focus:outline-none"
  placeholder="Tell something about yourself..."
  value={about}
  onChange={(e) => setAbout(e.target.value)}
/>
  <div className="label">
    <span className="label-text-alt">Optional</span>
  </div>
</fieldset>

   {/* save profile */}
       
          </div>
         <p className="text-red-500"> {error} </p>
          <div className="card-actions justify-center">
   <button
  className="btn btn-primary w-full mt-3
             hover:scale-105 transition-transform duration-200
             shadow-lg"
  onClick={saveProfile}
>
  Save Profile
</button>
          </div>
        </div>
      </div>
    </div>
    </div>


    < UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />


</div>
{showToast &&(
  <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Profile Updated Successfully..</span>
  </div>
  </div>

)}
    </>
  )
}

export default EditProfile