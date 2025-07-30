import React from 'react'
import Navbar from '../components/Navbar'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <h1 className='text-3xl font-bold text-blue-950'>Welcome, {user.email}</h1>
    </>
  )
}

export default Profile
