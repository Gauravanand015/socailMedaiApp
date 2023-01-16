const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const userRouter = express.Router()
require("dotenv").config()

userRouter.get("/",(req,res)=>{
    res.send("Getting all users")
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body;
    try {
        bcrypt.hash(password, 8, async (err, hash)=>{
            if(err){
                res.send("Something Went Wrong")
                console.log(err)
            }else{
                const user = new UserModel({name,email,gender,password:hash})
                await user.save()
                res.send("User Has Been Registered !!")
            }
        });
    } catch (error) {
        res.send("SOMETHING WENT WRONG!!")
        console.log(error)
    }
})

userRouter.post("/login",async (req,res)=>{
    const { email,password }= req.body;
    try {
        const findUser = await UserModel.find({email:email})
        console.log(findUser)
        if(findUser[0].email){
            // console.log("hello")
            bcrypt.compare(password, findUser[0].password, (err, result)=>{
               if(result){
                const token = jwt.sign({ userID: findUser[0]._id }, process.env.secretKey);
                res.send({"msg":"Login Successfull","token":token})
               }
               else{
                res.send("email or password is wrong")
                console.log(err)
               }
            });
        }
    } catch (error) {
        res.send("SOMETHING WENT WRONG!!")
        console.log(error)
    }
})


module.exports={
    userRouter
}