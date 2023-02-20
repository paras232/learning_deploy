const express=require("express")
const {userModel}=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass,5,async(err, hash)=>{
            if(err) res.send({"msg":"Something went Wrong","error":err.message})
            else{
                const user=new userModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"New user has been registered"})
            }
        })
        
    }catch(err){
        res.send({"msg":"Something went Wrong","error":err.message})
    }

    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=(req.body)
    try{
        const user=await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass, function(err, result) {
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in","token":token})
                }else{
                    res.send({"msg":"Wrong crendential"})
                }
            });
        }else{
            res.send({"msg":"Wrong crendential"})
        }
    }catch(err){
        res.send({"msg":"Something went Wrong","error":err.message})
    }
})

module.exports={
    userRouter
}