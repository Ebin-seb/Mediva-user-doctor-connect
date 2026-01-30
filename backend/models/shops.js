import mongoose, { Schema } from "mongoose";

const shopschema = new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    address:{type:String,require:true},
    phone:{type:Number,require:true},
    password:{type:String,require:true},
    image:{type:String,require:true},
    commonKey:{
        type:Schema.Types.ObjectId,
        ref:"login"
    }

})
const SHOP = mongoose.model("shops",shopschema)
export {SHOP} 