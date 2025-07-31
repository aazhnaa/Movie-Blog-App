//for handling response
const Movies = require("../models/movie") // we require the movie schema
const cloudinary = require("../config/cloudinary")
const fs = require("fs")



//all movies
const getMovies = async(req,res)=>{
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
    try{
        const {title,release_year,actors,review}=req.body

    if(!title ){
        return res.status(400).json({
            error:"Required fields cannot be empty"
        })
    }
    let imageUrl=''
    let imagePublicId = ''

    if(req.file){
        console.log("Image file received:", req.file);
        try {
            const uploadResponse = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadResponse.secure_url;
            imagePublicId = uploadResponse.public_id;
            console.log("Image uploaded to Cloudinary:", imageUrl);
        fs.unlinkSync(req.file.path);        
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    }
    else {
        console.log("no image received")
    }

    const newMovie = new Movies({
        title,
        release_year,
        actors,
        review,
        poster:imageUrl,
        posterId:imagePublicId
    })

    await newMovie.save()  
    console.log("new movie added!", newMovie)

    return res.status(200).json(newMovie)
    }
    catch(err){
        return res.status(400).json({
            error:"error 400. invalid request!"
        })
    }
}

const editMovie =async(req,res)=>{
    const {title,release_year,actors,review}=req.body
    const movie = await Movies.findById(req.params.id)

    try{
        if(!movie){
            return res.status(404).json({message:"Movie not found!"})
        }

        if(req.file){
            if(movie.posterId) {
                await cloudinary.uploader.destroy(movie.posterId);
            }
            const uploadResponse = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);

            movie.poster = uploadResponse.secure_url;
            movie.posterId = uploadResponse.public_id;
        }

        movie.title = title || movie.title;
        movie.release_year = release_year || movie.release_year;
        movie.actors = actors || movie.actors;
        movie.review = review || movie.review;

        await movie.save();
        return res.status(200).json({ message: "Movie updated successfully", movie });

    }
    catch(err){
        return res.status(404).json({
            error:"error 404. movie not found!"
        })
    }
}

const deleteMovie =async(req,res)=>{
    try {
        const { id } = req.params;

        const movie = await Movies.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // If image exists on Cloudinary, delete it
        if (movie.posterId) {
            await cloudinary.uploader.destroy(movie.posterId);
        }

        // Delete movie document from MongoDB
        await Movies.findByIdAndDelete(id);

        res.status(200).json({ message: "Movie deleted successfully" });
    }
    catch(err){
        return res.status(400).json({error:"invalid"})
    }
}

//exporting all
module.exports={getMovies,getMovie,addMovie,editMovie,deleteMovie}