import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import route from "./routes/index";
const app = express();

// DB
mongoose.connect("mongodb://127.0.0.1:27017/te1223")
.then(()=>{
    console.log("DB CONNECTED");
})

// Middleware
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/",route)

app.listen(1200,()=>{
    console.log("Server at 1200");
})