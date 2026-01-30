import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import user_route from "./routes/user_route.js";
import loginroute from "./routes/loginroutes.js";
import shoproute from "./routes/shoproute.js";
import 'dotenv/config'
import doctorroute from "./routes/doctorroutes.js";
import adminroute from "./routes/adminroute.js";

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("mongodb connected successfully")
})
.catch((error)=>{
    console.log("connection rejected ",error)
})



const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.listen(process.env.PORT,()=>{console.log("server started")})

app.use("/api/admin",adminroute)
app.use("/api/user",user_route)
app.use("/api/auth",loginroute)
app.use("/api/shop",shoproute)
app.use("/api/doctor",doctorroute)
app.use("/uploads",express.static("uploads"))