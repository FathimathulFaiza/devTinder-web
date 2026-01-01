import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      )
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div className="navbar bg-white shadow-lg border-b border-gray-200 px-6 py-3">
      
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-wide">
          DevPartner
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3">

          {/* Welcome text */}
          <div className="hidden sm:block text-gray-700 font-semibold">
            Welcome, <span className="text-gray-900">{user.firstName}</span>
          </div>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 h-12 rounded-full ring-2 ring-indigo-500 ring-offset-2 overflow-hidden">
                <img
                  alt="user photo"
                  src={user.photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg z-10 mt-3 w-56 p-2 shadow-lg border border-gray-200"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>

              <li>
                <Link to="/premium">Premium</Link>
              </li>

              <li>
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </li>
            </ul>

          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar