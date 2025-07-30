import React from "react";
import poster from "../assets/movie-poster.jpg";
import { NavLink } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import Popup from "./Popup";

import axios from "axios";

import { useLoaderData } from "react-router-dom"; //React hook provided by React Router v6.4+ (or later), used to access data loaded by a route's loader function.
import { useEffect, useState } from "react";

const MovieGrid = () => {
  const movies = useLoaderData();
  
  const [isOpen, setIsOpen] = useState(false)
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/movie/${id}`);
      setAllMovies((movies) => movies.filter((movies) => movies._id !== id));
      let filterMovie = favMovies.filter((movies) => movies._id !== id); // other movies in favMovies
      localStorage.setItem("fav", JSON.stringify(filterMovie));
    } catch (err) {
      console.error("error!", err);
    }
  };

  //for re rendering if a movie is deleted
  const [allMovies, setAllMovies] = useState([]);

  //we will use useEffect hook, so that whenever a movie is deleted i.e. movies is changed , the website is re rendered :-

  useEffect(() => {
    setAllMovies(movies);
  }, [movies]);

  //for favourites :
  // let favMovies = JSON.parse(localStorage.getItem("fav")) ?? []
  // const [isFavMovie, setIsFavMovie] = useState(false)
  // const favMovie=(movie)=>{
  //     let filterMovie = favMovies.filter(movies=>movies._id !== movie.id) // other movies in favMovies
  //     favMovies = favMovies.filter(movies=>movies._id === movie.id).length === 0? [...favMovies,movie]:filterMovie
  //     localStorage.setItem("fav", JSON.stringify(favMovies))
  //     setIsFavMovie(pre=>!pre)
  // }
  const [favMovies, setFavMovies] = useState(
    () => JSON.parse(localStorage.getItem("fav")) ?? []
  );

  const favMovie = (movie) => {
    const isAlreadyFav = favMovies.some((m) => m._id === movie._id);
    let updatedFavs = isAlreadyFav
      ? favMovies.filter((m) => m._id !== movie._id)
      : [...favMovies, movie];

    setFavMovies(updatedFavs);
    localStorage.setItem("fav", JSON.stringify(updatedFavs));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {allMovies.length == 0 ? (<h1 className="font-bold text-blue-950 text-2xl"> Nothing here !! Add movies{" "} </h1>) : (
          allMovies.map((movie) => (
            // <MovieCard key={movie._id} movie={movie} />
            <div key={movie._id}>
              <div
                className="max-w-sm bg-gray-300 shadow-lg rounded-2xl overflow-hidden"
                key={movie._id}
              >
                <FaHeart
                  className="absolute m-4 text-xl text-white cursor-pointer"
                  onClick={() => favMovie(movie)}
                  style={{
                    color: favMovies.some((res) => res._id === movie._id)
                      ? "red"
                      : "white",
                  }}
                />
                <img
                  className="w-full h-80 object-cover"
                  src={
                    movie.poster
                      ? `http://localhost:8000/images/${movie.poster}`
                      : poster
                  }
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    <span>{movie.title}</span>
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Release Year: {movie.release_year}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Actors: {movie.actors}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Review: {movie.review}
                  </p>
                </div>
                <div className="flex flex-row space-x-80">
                  <NavLink to={`/editMovie/${movie._id}`}>
                    <MdEdit className="m-2 text-xl inline cursor-pointer" />
                  </NavLink>
                  {/* <RiDeleteBinLine
                    onClick={() => deleteMovie(movie._id)}
                    className="text-xl m-2 inline cursor-pointer"
                  /> */}
                  <RiDeleteBinLine
                    onClick={() => setIsOpen(true)}
                    className="text-xl m-2 inline cursor-pointer"
                  />
                </div>
              </div>
                              
                  {isOpen && (
                    <Popup onClose={() => setIsOpen(false)}>
                      <>
                      <div className="flex flex-col justify-center align-middle">
                        <div className="w-100 h-40 flex flex-col ">
                        <p className=" font-bold">Are you sure you want to delete <span className="text-red-600">{movie.title}</span> ?</p>
                        <div className="flex flex-row ">
                          <button className="pl-4 pr-4 pt-2 pb-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg m-4 cursor-pointer" onClick={() => { deleteMovie(movie._id); setIsOpen(false); }} > Yes </button>
                          <button className="pl-4 pr-4 pt-2 pb-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg m-4 cursor-pointer" onClick={()=>{setIsOpen(false)}}> No </button>
                        </div>
                      </div>
                      </div>
                      </>
                    </Popup>)}
            </div>
            
          ))
        )}
      </div>
    </>
  );
};

export default MovieGrid;
