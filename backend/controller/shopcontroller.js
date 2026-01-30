import bcrypt from 'bcrypt'
import { SHOP } from '../models/shops.js'
import { LOGIN } from '../models/login.js'
import { PRODUCT } from '../models/product.js'
import  fs from 'fs'
import { log } from 'console'
import { ORDERS } from '../models/orders.js'


export const registershop=async(req,res)=>{
    try{
        const {name,email,address,password,phone} = req.body 
        const imagepath = req.file.path
        const exist = await LOGIN.findOne({username:email})
        if(exist){
            return res.status(401).json({statusCode:401,message:"already exists"})
        }

        const hashpassword = await bcrypt.hash(password,10)
        const newlogin = LOGIN({
            username:email,
            password:hashpassword,
            role:'shop'
        });
        await newlogin.save()
        
        const newshop = SHOP({
            commonKey:newlogin._id,
            name:name,
            email:email,
            phone:phone,
            address:address,
            image:imagepath
        })
        await newshop.save()
    
        res.status(201).json({message:"user registration successfull"})

    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})
        
    }

}


export const shophomeview =async(req,res)=>{
    console.log(req.params)
    const {id}=req.params
    try{
        const shop = await SHOP.findOne({commonKey:id})
        if(shop){
            res.status(200).json({message:"collection exist",shop})
        }
        else{
            res.status(401).json({message:"collection not found"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}


export const shopedit = async(req,res)=>{
    const {id} = req.params
    try{
        const shop = await SHOP.findOne({commonKey:id})
        console.log(shop,"---------------------");
        
        if(shop){
            res.status(200).json({shop})
        }
        else{
            res.status(401).json({message:"not found"})
        }
    }
    catch(e){res.status(500).json({message:"server error"})}
    
}

export const shopupdate = async(req,res)=>{
    const {id} =req.params
    const {name,address,phone} = req.body 
    console.log(id,name,"hhhhhhhhhhh")
    try{
        const exist = await SHOP.findOne({commonKey:id})
        if(!exist){
            return res.status(404).json({statusCode:404,message:"not found"})
        }
        let updatefield = {
            name:name,
            address:address,
            phone:phone,
        }
        if (req.file) {
          
            updatefield.image = req.file.path;
          } else {
           
            updatefield.image = exist.image
          }
        
        const shopupdates = await SHOP.findOneAndUpdate({commonKey:id},updatefield,{new:true});
        res.status(201).json({message:"shop updated successfull"})
        console.log("success")

    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})
        
    }

}

    
export const productadd = async(req,res)=>{
    const {name,category,price,stock,description} =req.body
    const imgpath = req.file.path
    
    // console.log(req.params.id)
    try{
        const shop= await SHOP.findOne({commonKey:req.params.id})
        const exist = await PRODUCT.findOne({name:req.body.name})
        console.log(imgpath,shop._id)
        if(exist){
            res.status(401).json({message:"product already exist"})
        }
        const newprod = PRODUCT({
            name:name,
            category:category,
            price:price,
            stock:stock,
            description:description,
            image:imgpath,
            shopid:shop._id
            
        })
        await newprod.save()
        res.status(200).json({message:"successfully added"})
    }
    catch(e){
        console.log(e);
        
        res.status(500).json({message:"server error"})
    }
}


export const showprod = async(req,res)=>{
    console.log(req.params.id);
    try{
        const shop = await SHOP.findOne({commonKey:req.params.id})
        const prod = await PRODUCT.find({shopid:shop._id})
        if(prod){
            res.status(200).json({prod})
        }
        else{
            res.status(401).json({message:"not found"})
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
    
}

export const currentproduct = async(req,res)=>{
    console.log("0000000",req.params.productid)
    try{
        const prod = await PRODUCT.findById(req.params.productid)
        if(prod){
            res.status(200).json({message:"successfull" , prod})
        }
        else{
            res.status(404).json({message:"product not found"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}

export const productedit = async(req,res)=>{
    console.log("sss",req.params.productid)
    
    try{
        const exist = await PRODUCT.findById(req.params.productid)
        if(!exist){
            return res.status(404).json({statusCode:404,message:"not found"})
        }
        let updatefield = {
            name:req.body.name,
            category:req.body.category,
        price:req.body.price,
        stock:req.body.stock,
        description:req.body.description,
            
        }
        
        if (req.file) {
          
            updatefield.image = req.file.path;
          } else {
           
            updatefield.image = exist.image
          }
        
        const productedit = await PRODUCT.findByIdAndUpdate(req.params.productid,updatefield,{new:true});
        res.status(201).json({message:"product updated successfull"})
        console.log("success")

    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})
        
    }

}

export const deleteprod =async(req,res)=>{
    console.log(req.params.productId);
    try{
        const prod = await PRODUCT.findByIdAndDelete(req.params.productId)
        if(prod){
            res.status(200).json({statusCode:200,message:"data deleted successfully"})
        }
        else{
            res.status(401).json({statusCode:401,message:"canot find the student"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
    
}


export const orders = async(req,res)=>{
    // console.log(req.params.shopid,"ssjjsjjsjjsjj")
    try{
        const orders = await ORDERS.find({shopid:req.params.shopid}).populate('productid')
        if(orders){
            res.status(200).json({message:"order successfully fetched",orders})
        }
        else{
            res.status(404).json({message:"orders not found"})

        }

    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"internal server error"})
    }
}


export const orderstatus =async(req,res)=>{
    console.log(req.body.status,req.params.orderid,"hiiii")
    try{
        const order  = await ORDERS.findByIdAndUpdate(req.params.orderid,{status:req.body.status})
        if(order){
            res.status(200).json({message:"status updated succesfully"})

        }
        else{
            res.status(401).json({message:"cannot updated"})

        }

    }
    catch(e)
    {
        res.status(500).json({message:"internal server error"})
    }
}