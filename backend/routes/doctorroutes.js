import express from 'express'
import { appointments, doctorprofile, doctorreg, profileedit, status } from '../controller/doctorcontroller.js'
import { upload } from '../middleware/multer.js'

const doctorroute= express.Router()

doctorroute.post('/register',upload.single('image'),doctorreg)
doctorroute.get('/doctorprofile/:logid',doctorprofile)
doctorroute.put('/editprofile/:id',upload.single('image'),profileedit)
doctorroute.get('/appointments/:docid',appointments)
doctorroute.patch('/status/:appointmentid',status)

export default doctorroute