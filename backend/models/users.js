import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:Number,require:true},
    password:{type:String,require:true},
    commonKey:{type:Schema.Types.ObjectId,ref:"login"}
})

const USER =mongoose.model("users",userschema)
export {USER}