import bcrypt from 'bcrypt'
import { LOGIN } from '../models/login.js'
import { DOCTOR } from '../models/doctor.js'
import { SHOP } from '../models/shops.js'
import { APPOINTMENT } from '../models/doctorAppointment.js'

export const doctorreg = async(req,res)=>{
    const {doctorName,regno,clinicName,clinicAddress,availibleDays,consultationTimeFrom,consultationTimeTo,fees,experience,qualification,email,phone,password,token }= req.body
   // console.log(req.body)
    try{
      const imagepath = req.file.path
      const exist = await LOGIN.findOne({username:email})
      if(exist){
          return res.status(401).json({statusCode:401,message:"already exists"})
      }

      const hashpassword = await bcrypt.hash(password,10)
      const newlogin = LOGIN({
          username:email,
          password:hashpassword,
          role:'doctor'
      });
      await newlogin.save()
      
      const newdoc = DOCTOR({
         commonKey:newlogin._id,
         doctorName:doctorName,
         regno: regno,
         clinicName: clinicName,
         clinicAddress:clinicAddress,
         availibleDays:availibleDays,
         consultationTimeFrom: consultationTimeFrom,
         consultationTimeTo: consultationTimeTo,
         fees: fees,
         experience: experience,
         qualification:qualification,
         email: email,
         phone:phone,
         password: password,
         tokens: token,
         profilePic:imagepath,
         maxTokens:token
         
      })
      await newdoc.save()
  
      res.status(201).json({message:"doctor registration successfull"})

  }
  catch(e){
      console.log(e);
      res.status(500).json({message:"server error"})
      
  }
 }


 export const doctorprofile = async(req,res)=>{
    console.log(req.params.logid);
    try{
        const doctor = await DOCTOR.findOne({commonKey:req.params.logid})
        if(doctor){
            res.status(200).json({message:"doctor found",doctor})
        }
        else{
            res.status(401).json({message:"doctor not found"})
        }
    }
    catch(e){
        res.status(500).json({message:"server error"})
    }
 }


 export const profileedit = async(req,res)=>{
    const {id} =req.params
    console.log(id,"hhhhhhhhhhh")
    try{
        const exist = await DOCTOR.findById(id)
        if(!exist){
            return res.status(404).json({statusCode:404,message:"not found"})
        }
        let updatefield = {
            doctorName:req.body.doctorName,
            clinicName: req.body.clinicName,
            clinicAddress: req.body.clinicAddress,
            availibleDays: req.body.availibleDays,
            consultationTimeFrom: req.body.consultationTimeFrom,
            consultationTimeTo: req.body.consultationTimeTo,
            fees: req.body.fees,
            experience: req.body.experience,
            qualification: req.body.qualification,
            phone: req.body.phone,
            tokens: req.body.token,
        }
        if (req.file) {
          
            updatefield.profilePic = req.file.path;
          } else {
           
            updatefield.profilePic = exist.image
          }
        
         await DOCTOR.findByIdAndUpdate(id,updatefield,{new:true});
        res.status(201).json({message:"profile updated successfully"})
        console.log("success")

    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})
        
    }

}


export const appointments = async(req,res)=>{
    console.log(req.params.docid)
    try{
        const appo = await APPOINTMENT.find({doctorid:req.params.docid})
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

export const status = async(req,res)=>{
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