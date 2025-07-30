const Users = require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken") 
const userSignUp= async(req,res)=>{
    //get email pass:
    const {email,password}=req.body

    if(!email || !password){
        return res.status(404).json({error:"Email and Password Required!"})
    }

    //checking if email already exists : 
    let user = await Users.findOne({email})
    if(user){
        return res.status(400).json({error:"This email is already registered!"})
    }

    //hashing password
    const hashPass = await bcrypt.hash(password,10)
    const newUser = await Users.create({
        email,password:hashPass
    })

    let token =jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({token,user:newUser})
}

const userLogin = async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(404).json({message:"Email and Password Required!"})
    }

    //checking for user:
    let user = await Users.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else{
        return res.status(400).json({error:"invalid email or password"})
    }
}

const getUser = async(req,res)=>{
    const user = await Users.findById(req.params.id)
    return res.json({email:user.email})
}

module.exports={userSignUp,userLogin,getUser}