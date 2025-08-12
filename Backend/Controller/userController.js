const jwt = require("jsonwebtoken");

const userModel = require('../models/userModel')
const bcrypt = require ('bcrypt');
const key = process.env.ACCESS_SECRET_TOKEN;
//Create an Account
const signup = async (req,res) =>{
   
    const{fullName,email,password} = req.body;
    try {
       const existingUser = await userModel.findOne({email:email});
       if(existingUser){
        return res.status(400).json({message:"user already exist"});
       }
       const hashedPassword = await bcrypt.hash(password,10);
     
       const result = await userModel.create({
        fullName:fullName,
        email:email,
        password:hashedPassword
       });
       const token = jwt.sign({email:result.email,id:result._id},key)
       res.json({user:result,token:token});

    } 
    catch (error) {
        
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }
}


// Login 
const signin = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"user not found"});
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(404).json({message:"Invalid credentials"})
        }
          const token = jwt.sign({email:existingUser.email,id:existingUser._id},key)
          res.status(200).json({user:existingUser,token:token})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"something invalid"})
    }
}

//get user

const getUser = async (req, res) => {
  try {
    //console.log("User ID from token:", req.userId); // 
    const getUser = await userModel.findOne({ _id: req.userId }); 
    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      fullName: getUser.fullName,
      email: getUser.email,
      _id: getUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

  
module.exports = {signup,signin,getUser}