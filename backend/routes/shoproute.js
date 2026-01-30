import express from 'express'
import { currentproduct, deleteprod, orders, orderstatus, productadd, productedit, registershop, shopedit, shophomeview, shopupdate, showprod } from '../controller/shopcontroller.js'
import { upload } from '../middleware/multer.js'
import { LOGIN } from '../models/login.js';

const shoproute = express.Router()


shoproute.post("/register",upload.single('image'),registershop)
shoproute.get('/shophome/:id',shophomeview)
shoproute.get('/shopedit/:id',shopedit)
shoproute.put('/updateshop/:id',upload.single('image'),shopupdate)
shoproute.post('/productadd/:id',upload.single('image'),productadd)
shoproute.get('/showprod/:id',showprod)
shoproute.get('/currentproduct/:productid',currentproduct)
shoproute.put('/productedit/:productid',upload.single('image'),productedit)
shoproute.delete('/deleteproduct/:productId',deleteprod)
shoproute.get('/orders/:shopid',orders)
shoproute.put('/orderstatus/:orderid',orderstatus)


export default shoproute