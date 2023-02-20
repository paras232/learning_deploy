const express=require("express")
const { noteModel } = require("../models/note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes= await noteModel.find()
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    try{
        const payload=req.body
        const note = new noteModel(payload)
        await note.save()
        res.send({"msg":"note Created"})
    }catch(err){
        res.send({"msg":err.message})
    }
})


noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const noteID=req.params.id
    const note= await noteModel.findOne({_id:noteID})
    const user_in_note=note.userID
    const user_in_making=req.body.userID
    try{
        if(user_in_making!==user_in_note){
            res.send({"msg":"You are not Authorized"})
        }else{
            await noteModel.findByIdAndUpdate({_id:noteID},payload)
       res.send({"msg":`note with userID ${noteID} has been updated`})
        }
    }catch(err){
        res.send({"msg":err.message})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    try{
    await noteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":`note with userID ${noteID} has been deleted`})
    }catch(err){
        res.send({"msg":err.message})
    }
})

module.exports={
    noteRouter
}