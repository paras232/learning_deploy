const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {noteRouter}=require("./routes/note.routes")
const {authenticate}=require("./middleware/authenticate.middleware")


const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(3000,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log({"error":err.message})
    }
    console.log("Server is runing on port 3000")
})