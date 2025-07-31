import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddMovie = () => {

    const backendURL = import.meta.env.VITE_BACKEND_URL ;
    const[movieData, setMovieData]=useState({
    title: '',
    release_year: '',
    actors: '',
    review: ''
  })//initially empty array
    const navigate = useNavigate()

    const handleOnChange=(e)=>{
      //let val = (e.target.name==="actors")?e.target.value.split(","):e.target.value
      let val = (e.target.name==="file")?e.target.files[0]:e.target.value
      setMovieData(pre=>({...pre,[e.target.name]:val})) //... is the spread operator, here it means that keep previous values of pre as same (i.e keep title, release year etc all same) just update actors
    }

    const handleOnSubmit=async(e)=>{
        try{
          e.preventDefault()
          await axios.post(`${backendURL}/movie`,movieData
            ,{
            headers:{
              'authorization':'bearer '+localStorage.getItem("token")
                }
             }
          )
          console.log("movie added")
          navigate("/") // go to home page
        }
        catch(err){
          console.error("Upload failed:", err);
        }

    }

    

    
  return (
    <>
      <div className=' w-full bg-slate-200 p-8'> 
        <p className='font-bold text-blue-950 text-2xl pb-8'>Share your movies</p>
        <form className='flex flex-col' onSubmit={handleOnSubmit}>
            <input onChange={handleOnChange} name="title" className='input-box rounded-md m-4 p-2 focus:ring-blue-700 w-fit' type="text" placeholder='Enter movie title'/>
            <input onChange={handleOnChange} name="release_year" className='input-box rounded-md m-4 p-2 focus:ring-blue-700 w-fit' type="text" placeholder='Enter release year' />
            <input onChange={handleOnChange} name="actors" className='input-box rounded-md m-4 p-2 focus:ring-blue-700 w-fit' type="text" placeholder='Actors' />
            <input onChange={handleOnChange} name="review" className='input-box rounded-md m-4 p-2 focus:ring-blue-700 w-fit' type="text" rows="5" placeholder='Enter Review' />
            <input onChange={handleOnChange} type="file" name="file" className='border-none rounded-md' />
            <button className='p-2 w-48 m-4 hover:bg-blue-900 text-white font-bold rounded-md bg-blue-950' type="submit">Add</button>

        </form>
      </div>
    </>
  )
}

export default AddMovie
