import mongoose, { Schema } from "mongoose";

const loginschema = new Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    role:{type:String,require:true} 
})
const LOGIN = mongoose.model("Login",loginschema)
export {LOGIN}