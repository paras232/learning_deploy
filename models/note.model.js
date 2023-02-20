const mongoose=require("mongoose")

const noteSchema = mongoose.Schema({
    title:String,
    body:String,
    catagory:String,
    user:String
})

const noteModel = mongoose.model("note",noteSchema)

module.exports={
    noteModel
}