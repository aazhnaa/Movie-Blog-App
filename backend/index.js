const express=require("express") //to import the express framework
const app = express() //app is the main object that handles the web server


const dotenv=require("dotenv").config() //to read values from the .env file and store it 
const connectionDb=require("./config/connectionDb")
const cors = require("cors")
const PORT = process.env.PORT||3000 

connectionDb()
app.use(express.json())
app.use(cors())//allow all origins
app.use(express.static("public"))


app.use("/",require("./routes/user"))
app.use("/movie",require("./routes/movies"))


app.listen(PORT, (err)=>{
    console.log(`app is listening on port ${PORT}`)
})