import mongoose, { Schema } from "mongoose"

const productschema = new Schema({
    name:{type:String,require:true},
    category:{type:String,require:true},
    price:{type:String,require:true},
    stock:{type:Number,require:true},
    description:{type:String,require:true},
    image:{type:String,require:true},
    shopid:{type:Schema.Types.ObjectId,
        ref:"shops"
    }
})
const PRODUCT = mongoose.model("products",productschema)
export {PRODUCT}