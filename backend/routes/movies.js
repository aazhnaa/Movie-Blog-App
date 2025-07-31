const express = require("express")
const router = express.Router()
const {getMovies, getMovie,addMovie, editMovie, deleteMovie} = require("../controller/movies")
const upload = require("../middleware/multer")

//all routes
router.get("/",getMovies)//for all info
router.get("/:id",getMovie)//infor by id
router.post("/",upload.single('poster'),addMovie)//add infor //upload.single('file')
router.put("/:id",upload.single('poster'),editMovie)//ediy infor
router.delete("/:id",deleteMovie)//delete by id
module.exports=router