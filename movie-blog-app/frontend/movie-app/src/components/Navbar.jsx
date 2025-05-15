import React, { useEffect } from 'react'
import { useState } from 'react'
import Popup from './Popup'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token?false:true)
  useEffect(()=>{
    setIsLogin(token?false:true)
  },[token])

  const checkLogin=()=>{
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
       window.location.reload();
    }
    else setIsOpen(true)
  }
  
  return (
    <>
      <nav className="bg-blue-400 p-2">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-white text-xl font-bold"><NavLink to={"/"}>MyApp</NavLink></div>

          {/* Navbar Links */}
          <ul className="flex space-x-4 cursor-pointer">

          <li ><NavLink to="/" className="text-white hover:text-blue-800">Home</NavLink></li>
          <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={(isLogin)?"/":"/favMovies"} className="text-white hover:text-blue-800">Favourites</NavLink></li>

          <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={(isLogin)?"/":"/profile"} className="text-white hover:text-blue-800">Profile</NavLink></li>
          
          <li className="text-white hover:text-blue-800" onClick={checkLogin}><p>{(isLogin)?"Login":"Log Out"}</p></li> 
          </ul>
        </div>
      </nav>

      {(isOpen) && <Popup onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Popup>}
    </>
  );
}

export default Navbar
