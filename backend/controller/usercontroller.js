import { DOCTOR } from "../models/doctor.js";
import { APPOINTMENT } from "../models/doctorAppointment.js";
import { LOGIN } from "../models/login.js"
import { ORDERS } from "../models/orders.js";
import { PRODUCT } from "../models/product.js";
import { USER } from "../models/users.js"
import bcrypt from 'bcrypt'

export const registeruser=async(req,res)=>{

    const {name,email,phone,password} = req.body
    try{
        const exist = await LOGIN.findOne({username:email})
        if(exist){
            return res.status(401).json({statusCode:401,message:"already exists"})
        }

        const hashpassword = await bcrypt.hash(password,10)
        const newlogin = LOGIN({
            username:email,
            password:hashpassword,
            role:'user'
        });
        await newlogin.save()
        
        const newuser = USER({
            commonKey:newlogin._id,
            name:name,
            email:email,
            phone:phone,
          
        })
        await newuser.save()
    
        res.status(201).json({message:"user registration successfull"})

    }
    catch(error){
        console.log(error);
        
        res.status(500).json({message:"server error"})
    }
};

export const userprofile = async(req,res)=>{
    // console.log(req.params.logid);
    try{
        const user = await USER.findOne({commonKey:req.params.logid})
        if(user){
            res.status(200).json({message:"user found",user})
        }
        else{
            res.status(401).json({message:"user not found"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}

export const updateprofile = async(req,res)=>{
    try{
        const user = await USER.findByIdAndUpdate(req.params.id,{name:req.body.name,phone:req.body.phone})
        if(user){
            res.status(200).json({message:"successfully update"})
        }
        else{
            res.status(401).json({message:"user not found"})
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }

}

export const userproducts = async(req,res)=>{
    try{
        const products = await PRODUCT.find()
        if(products){
            res.status(200).json({message:"product present",products})
        }
        else{
            res.status(401).json({message:"no prducts found found"})
        }
    }   
    catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
}


export const productdetails = async(req,res)=>{
    try{
        const product = await PRODUCT.findById(req.params.productid)
        if(product){
            res.status(200).json({message:"fetch successfull",product})
        }
        else{
            res.status(401).json({message:"no product found"})
        }

    }
    catch(e){
        console.log(e)
        res.status(e).json({message:"server error"})
    }
}


export const userorder=async(req,res)=>{
    const {orderId,address,totalPrice, quantity,phone,userId,productId} = req.body
    console.log(orderId,address,totalPrice,quantity,phone,userId,productId,"kkkkkkkk")

    try{
        const order =await ORDERS.findOne({orderid:orderId})
        const product = await PRODUCT.findById(productId)
        if(order){
            console.log("stock")

           return res.status(401).json({message:"order already exist"})
        }
        if(!product){
            console.log("stock")

            return res.status(404).json({ message: "Product not found" });
        }
        const stock = product.stock-quantity
        if(stock<0){
            console.log("stock")
            return res.status(401).json({message:"there is no acvailible stock"})
        }
        await PRODUCT.findByIdAndUpdate(productId,{stock:stock})
        const neworder = ORDERS({
            orderid:orderId,
            address:address,
            totalprice:totalPrice,
            quantity:quantity,
            status:"pending",
            phone :phone,
            userid:userId,
            shopid:product.shopid,
            productid:productId
        })   
        await neworder.save()
        res.status(200).json({message:"products added succesfully"})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
}

export const vieworder = async(req,res)=>{
    const {userid} = req.params
    // console.log(userid)
    try{    
        const order = await ORDERS.find({userid:userid})
        const productid = order.map(order => order.productid);
        const product = await PRODUCT.find({_id:{$in:productid}})
        console.log(product)
        if(order){
        res.status(200).json({message:"product present",order,product})
    }
    else{
        res.status(401).json({message:"no prducts found found"})
    }
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
}

export const cancelorder = async(req,res)=>{
    console.log(req.params.id)
    try{
        const order = await ORDERS.findByIdAndDelete(req.params.id)
        if(order){
            res.status(200).json({statusCode:200,message:"data deleted successfully"})
        }
        else{
            res.status(401).json({statusCode:401,message:"cannot find"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
    
}


export const viewdoctor = async(req,res)=>{
    try{
        const doctor = await DOCTOR.find()
        if(doctor){
            res.status(200).json({message:"fetch successfull",doctor})
        }
        else{
            res.status(401).json({message:"no doctor found"})
        }

    }
    catch(e){
        console.log(e)
        res.status(e).json({message:"server error"})
    }
}


export const docbooking = async(req,res)=>{
   const {doctorid,userid,status,fees,date,symptoms,patientName,phone} = req.body
   console.log(doctorid,symptoms,phone)
   try{
    const doctor= await DOCTOR.findById(doctorid)
    const user = await USER.findById(userid)
    if(!doctor || !user ){
        return res.status(404).json({message:"not found"})
    }
    const today = new Date().toDateString();
    const lastUpdated = new Date(doctor.updatedAt).toDateString();

    if (today !== lastUpdated) {
      doctor.tokens = 0;
    }
    if(doctor.tokens >=  doctor.maxTokens){
        return res.status(201).json({message:"you are out of token"})
    }
   
    doctor.tokens+=1;
    await doctor.save();    

    const newbooking = APPOINTMENT({
        patientName:patientName,
        fees:doctor.fees,
        status:status,
        symptoms:symptoms,
        phone:phone,
        userid:userid,
        doctorid:doctorid
    })
    await newbooking.save()
        res.status(200).json({message:"appointment  succesfull",})
   }
   catch(e){
    console.log(e)
    res.status(e).json({message:"server error"})
}}



export const appointmentsuser = async(req,res)=>{
    console.log(req.params.docid)
    try{
        const appo = await APPOINTMENT.find({userid:req.params.userid})
        if(appo){
            res.status(200).json({message:"booking found",appo})
        }
        else{
            res.status(401).json({message:"booking not found"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
}

export const statususer = async(req,res)=>{
   try{
        const exist = await APPOINTMENT.findByIdAndUpdate(req.params.appointmentid,{$set:req.body},{new:true})
        console.log(exist)
        if(!exist){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(exist);
   }
   catch(e){
    res.status(500).json({message:"server error"})
}

}