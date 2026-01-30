import mongoose, { Schema } from "mongoose";

const doctorschema = new Schema({
    doctorName:{type:String,require:true},
    regno:{type:String,require:true},
    clinicName:{type:String,require:true},
    clinicAddress:{type:String,require:true},
    availibleDays:{type:String,require:true},
    consultationTimeFrom:{type:String,require:true},
    consultationTimeTo:{type:String,require:true},
    fees:{type:Number,require:true},
    experience:{type:String,require:true},
    qualification:{type:String,require:true},
    profilePic:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    maxTokens:{type:Number,default:0},
    tokens:{type:Number,default:0},
    phone:{type:Number,require:true},
    password:{type:String,require:true},
    commonKey:{type:Schema.Types.ObjectId,ref:"login"},
},{timestamps:true})


const DOCTOR =mongoose.model("doctor",doctorschema)
export {DOCTOR}