import React from 'react'
import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import MainNavigation from './components/MainNavigation'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import axios from 'axios'
import EditMovie from './pages/EditMovie'
import FavMovie from './pages/FavMovie'

//fetching data from database :
const getAllMovies = async()=>{
  let allMovies=[]
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  await axios.get(`${backendURL}/movie`).then(res=>{
    allMovies=res.data
  })

  return allMovies
}

//fetching fav movies :
const getFavMovies =()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

//creating router :
const router = createBrowserRouter([
  {
    path:"/", element:<MainNavigation/>, children:[
      {path:"/",element:<Home/>,loader:getAllMovies},
      {path:"/addMovie",element:<AddMovie/>},
      {path:"/favMovies",element:<FavMovie/>, loader:getFavMovies},
      {path:"/editMovie/:id",element:<EditMovie/>}
    ]
  }
  
])




const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
