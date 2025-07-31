import React from 'react'
import MovieGrid from '../components/MovieGrid'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import InputForm from '../components/InputForm'
import Popup from '../components/Popup'
const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token?false:true)
  const navigate = useNavigate()
  const goToAddMovie=()=>{
    let token = localStorage.getItem("token")

    if(token){
      navigate("/addMovie")
    }
    else{
      setIsOpen(true)
    }
    
  }

  const handleLogin=()=>{
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else setIsOpen(true)
  }

  useEffect(()=>{

  },[])

  return (
    <> 
      <section className='h-48 w-full bg-blue-100'>
        <h1 className='font-bold text-3xl text-blue-950 p-8'>Add movies you have watched </h1>
        <button onClick={goToAddMovie} className='p-2 ml-8 hover:bg-blue-900 text-white font-bold rounded-md bg-blue-950' >Add Movie</button>
      </section>    
      
      {(isLogin)?
        <div className='flex flex-col h-full justify-center items-center text-center text-2xl font-bold text-blue-950 '>
          <h1 className='p-4'>Login to see your movie reviews!</h1>
          <button className="text-black bg-slate-500 rounded-lg pl-4 pr-4 pt-2 pb-2  hover:text-blue-800" onClick={handleLogin}>Login</button> 
        </div> :
        <div className="card-container h-full grid-cols-2 grid-rows-1">
          <p className='font-bold text-3xl text-blue-950 p-8'>Your Movies</p>
        <MovieGrid/>
      </div>
      }
      

      {(isOpen) && <Popup onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Popup>}
    </>
  )
}

export default Home
