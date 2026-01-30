import mongoose, { Schema, Types } from "mongoose"

const doctorAppointmentSchema = new Schema({
    
    patientName:{type:String,require:true},
    fees:{type:String,require:true},
    status:{type:String,require:true},
    date:{type:Date,default:Date.now},
    symptoms:{type:String,require:true},
    phone:{type:Number,require:true},
    userid:{type:Schema.Types.ObjectId,ref:"users"},
    doctorid:{type:Schema.Types.ObjectId,ref:"doctor"}
})
const APPOINTMENT = mongoose.model("appointments",doctorAppointmentSchema)
export {APPOINTMENT}