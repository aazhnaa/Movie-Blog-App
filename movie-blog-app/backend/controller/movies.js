//for handling response
const Movies = require("../models/movie") // we require the movie schema
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },

    //our storage
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  //export this upload as well
  const upload = multer({ storage: storage })


//all movies
const getMovies =async(req,res)=>{
    const movies = await Movies.find()
    return res.json(movies)
}

//movie by id
const getMovie =async(req,res)=>{
    const movie = await Movies.findById(req.params.id)
    res.json(movie)
}

//add Movie
const addMovie =async(req,res)=>{
    console.log(req.file) 
    const {title,release_year,actors,review}=req.body

    if(!title ){
        return res.status(400).json({
            error:"Required fields cannot be empty"
        })
    }
    console.log("movie added")
    const newMovie=await Movies.create({
        title,release_year,actors,review,poster:req.file.filename
    }) 

    return res.json(newMovie)
}

const editMovie =async(req,res)=>{
    const {title,release_year,actors,review}=req.body
    const movie = await Movies.findById(req.params.id)

    try{
        if(movie){
            let poster=req.file?.filename ? req.file?.filename : movie.poster
            await Movies.findByIdAndUpdate(req.params.id,{...req.body,poster}, {new:true})
            res.json({title,release_year,actors,review})
        }
    }
    catch(err){
        return res.status(404).json({
            error:"error 404. movie not found!"
        })
    }
}

const deleteMovie =async(req,res)=>{
    try{
        await Movies.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({error:"invalid"})
    }
}

//exporting all
module.exports={getMovies,getMovie,addMovie,editMovie,deleteMovie,upload}