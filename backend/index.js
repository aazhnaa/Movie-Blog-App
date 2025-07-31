const express=require("express") //to import the express framework
const app = express() //app is the main object that handles the web server


const dotenv=require("dotenv").config() //to read values from the .env file and store it 
const connectionDb=require("./config/connectionDb")
const cors = require("cors")
const PORT = process.env.PORT||3000 
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

connectionDb()

app.use(cors({
  origin: "https://movie-blog-app.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json())

// app.use(cors({
//     origin : "https://movie-blog-app.netlify.app/",
//     credentials: true
// }))
app.use(express.static("public"))


app.use("/",require("./routes/user"))
app.use("/movie",require("./routes/movies"))

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});



app.listen(PORT, (err)=>{
    console.log(`app is listening on port ${PORT}`)
})