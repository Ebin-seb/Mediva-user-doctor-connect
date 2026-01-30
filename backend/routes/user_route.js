import express from 'express'
import { appointmentsuser, cancelorder, docbooking, productdetails, registeruser, statususer, updateprofile, userorder, userproducts, userprofile, viewdoctor, vieworder } from '../controller/usercontroller.js'
import { appointments, status } from '../controller/doctorcontroller.js'

const userroute = express.Router()
userroute.post("/register",registeruser)
userroute.get('/userprofile/:logid',userprofile)
userroute.put('/updateprofile/:id',updateprofile)
userroute.get('/products',userproducts)
userroute.get('/productdetails/:productid',productdetails)
userroute.post('/userorder',userorder)
userroute.get('/vieworders/:userid',vieworder)
userroute.delete('/cancelorder/:id',cancelorder)
userroute.get('/viewdoctor',viewdoctor)
userroute.post('/docbooking',docbooking)
userroute.get('/appointments/:userid',appointmentsuser)
userroute.patch('/status/:appointmentid',statususer)



export default userroute 