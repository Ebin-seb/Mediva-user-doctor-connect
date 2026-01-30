import mongoose, { Schema, Types } from "mongoose"

const orderschema = new Schema({
    orderid:{type:String,require:true},
    address:{type:String,require:true},
    totalprice:{type:Number,require:true},
    quantity:{type:String,require:true},
    status:{type:String,require:true},
    orderdate:{type:Date,default:Date.now},
    phone:{type:String,require:true},
    userid:{type:Schema.Types.ObjectId,ref:"users"},
    shopid:{type:Schema.Types.ObjectId,
        ref:"shops"
    }, 
    productid:{type:Schema.Types.ObjectId,ref:"products"}
})
const ORDERS = mongoose.model("orders",orderschema)
export {ORDERS}