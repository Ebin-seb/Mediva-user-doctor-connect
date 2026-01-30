import { loginuser } from "../controller/logincontroller.js"
import express from 'express'

const loginroute = express.Router()
loginroute.post("/",loginuser)

export default loginroute