import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const InputForm = ({setIsOpen}) => {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isSignedUp, setIsSignedUp]=useState(false)
    const [error,setError]=useState("")
    const navigate = useNavigate()
    const handleSubmit=async(e)=>{
        
        e.preventDefault() 
        let endpoint =(isSignedUp)?"signUp":"login"
        await axios.post(`http://localhost:8000/${endpoint }`,{email,password})
        .then((res)=>{
            //storing token and user in local storage :
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
             window.location.reload();
            setIsOpen()

        })
        .catch(data=>setError(data.response?.data?.error))
    }

  return (
    <>
      <div className="form-container ">
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center align-middle'>


            <input className='mb-4 focus:ring-blue-400 focus:ring-2 w-full rounded-md p-2' type="text" placeholder='Email' required onChange={(e)=>setEmail(e.target.value)}/>



            <input  className='mb-4 focus:ring-blue-400 focus:ring-2 w-full rounded-md p-2' type="password" placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} />


            <button type='submit' onClick={handleSubmit} className='bg-blue-600 p-2 rounded-md w-[70%] text-white hover:bg-blue-500'>{(isSignedUp)?"Register":"Login"}</button>

            {(error!="") && <p className='text-red-600 font-bold'>{error}</p>}

            <p onClick={()=>setIsSignedUp(pre=>!pre)} className='text-blue-600 hover:underline cursor-pointer'>{(isSignedUp)?"Already have an account?": "Create a new account"}</p>
        </form>
      </div>
    </>
  )
}

export default InputForm
