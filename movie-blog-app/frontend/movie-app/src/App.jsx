import React from 'react'
import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import MainNavigation from './components/MainNavigation'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import axios from 'axios'
import EditMovie from './pages/EditMovie'
import FavMovie from './pages/FavMovie'
import Profile from './pages/Profile'

//fetching data from database :
const getAllMovies = async()=>{
  let allMovies=[]
  await axios.get('http://localhost:8000/movie').then(res=>{
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
      {path:"/profile",element:<Profile/>,loader:getAllMovies},
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
