const mongoose = require("mongoose")
const connectionDb = async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING).then(()=>console.log("connection to database is successful!"))
}

module.exports=connectionDb