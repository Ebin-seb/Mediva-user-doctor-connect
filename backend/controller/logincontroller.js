import { LOGIN } from "../models/login.js"
import bcrypt from 'bcrypt'

export const loginuser=async(req,res)=>{
    console.log("hiiii");
    
    const {username,password} = req.body
    try{
        const usr = await LOGIN.findOne({username:username})
        if(!usr){
            return res.status(400).json({message:"user is not found"})
        }
        const ismatch = await bcrypt.compare(password,usr.password)
        if(!ismatch){
                
                res.status(401).json({message:"no match found"})
            }
            else{
                res.status(200).json({message:"successfully logged in ",usr})
            }

        }
        catch(error){
            console.log(error);
            
            res.status(500).json({message:"server error"})
        }
}