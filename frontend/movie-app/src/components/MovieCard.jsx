import React from 'react'
import axios from 'axios';
import poster from '../assets/movie-poster.jpg'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBinLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
const MovieCard = ({movie}) => {  
  const backendURL = import.meta.env.VITE_BACKEND_URL ;
  console.log(movie.poster)
  const deleteMovie=async(id)=>{
    try{
      await axios.delete(`${backendURL}/movie/${id}`)
    }
    catch(err){
      console.error("error!",err)
    }
  }
  return (
    <>
                <div className="max-w-sm bg-gray-300 shadow-lg rounded-2xl overflow-hidden" key={movie.id}>
                <img className="w-full h-80 object-cover" src={movie.poster ? movie.poster : poster} />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800"><span>{movie.title}</span></h2>
                  <p className="text-gray-600 text-sm">Release Year: {movie.release_year}</p>
                  <p className="text-gray-600 text-sm">Actors: {movie.actors}</p>                  
                  <p className="text-gray-600 text-sm">Review: {movie.review}</p>
                </div>
                <div className='flex flex-row space-x-80'>
                  <NavLink to={`/editMovie/${movie._id}`}>< MdEdit className='m-2 text-xl inline cursor-pointer'/></NavLink>
                  <RiDeleteBinLine onClick={()=>deleteMovie(movie._id)} className='text-xl m-2 inline cursor-pointer'/>
                </div>
              </div>
    </>
  )
}

export default MovieCard
