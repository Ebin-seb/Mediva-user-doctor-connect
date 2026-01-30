import express from 'express'
import { deletedoctor, deleteshop, deleteuser, fetchdoctor, fetchshop, fetchuser } from '../controller/admincontroller.js'

const adminroute= express.Router()

adminroute.get('/user',fetchuser)
adminroute.get('/doctor',fetchdoctor)
adminroute.get('/shop',fetchshop)
adminroute.delete('/deleteuser/:id',deleteuser)
adminroute.delete('/deletedoctor/:id',deletedoctor)
adminroute.delete('/deleteshop/:id',deleteshop)


export default adminroute