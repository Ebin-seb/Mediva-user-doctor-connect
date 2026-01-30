import { DOCTOR } from "../models/doctor.js"
import { SHOP } from "../models/shops.js"
import { USER } from "../models/users.js"

export const fetchuser= async(req,res)=>{
    try{
        const exist=await USER.find()
        
        if(exist.length<1){
            return res.status(404).json({message:'no data found'})
        }
        res.status(200).json({message:"found",exist})
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}

export const fetchdoctor= async(req,res)=>{
    try{
        const exist=await DOCTOR.find()
        
        if(exist.length<1){
            return res.status(404).json({message:'no data found'})
        }
        res.status(200).json({message:"found",exist})
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}

export const fetchshop= async(req,res)=>{
    try{
        const exist=await SHOP.find()
        
        if(exist.length<1){
            return res.status(404).json({message:'no data found'})
        }
        res.status(200).json({message:"found",exist})
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}

export const deleteuser = async(req,res)=>{
    // console.log(req.params.id)
    try{
        const ent = await USER.findByIdAndDelete(req.params.id)
        if(ent){
            res.status(200).json({message:"successfully deleted"})
        }
        else{
            res.status(401).json({message:"error in deletion"})
        }
    }
    catch(e){
        console.log(e)  
        res.status(500).json({message:"server error"})
    }
}   


 export const deletedoctor = async(req,res)=>{
    // console.log(req.params.id)
    try{
        const ent = await DOCTOR.findByIdAndDelete(req.params.id)
        if(ent){
            res.status(200).json({message:"successfully deleted"})
        }
        else{
            res.status(401).json({message:"error in deletion"})
        }
    }
    catch(e){
        console.log(e)  
        res.status(500).json({message:"server error"})
    }
}   

export const deleteshop = async(req,res)=>{
    // console.log(req.params.id)
    try{
        const ent = await SHOP.findByIdAndDelete(req.params.id)
        if(ent){
            res.status(200).json({message:"successfully deleted"})
        }
        else{
            res.status(401).json({message:"error in deletion"})
        }
    }
    catch(e){
        console.log(e)  
        res.status(500).json({message:"server error"})
    }
}   