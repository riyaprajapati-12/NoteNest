const express = require("express");
const userRouter= express.Router();
const {signup,signin,getUser} = require("../Controller/userController");
const auth = require("../Middleware/auth")

userRouter.post('/signup',signup);
userRouter.post('/signin',signin);
userRouter.get('/getuser',auth,getUser);
module.exports = userRouter