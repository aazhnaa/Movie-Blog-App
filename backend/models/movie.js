const mongoose = require("mongoose")
const movieSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    release_year:{
        type:String,
    },

    actors:{
        type:String,
    },
    review:{
        type:String,
    },
    poster:{
        type:String,
    },
},{timestamps:true})

module.exports=mongoose.model("movies",movieSchema)