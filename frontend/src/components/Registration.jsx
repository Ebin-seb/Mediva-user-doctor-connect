import React from 'react'
import Navbars from './Navbars'
import {Link} from 'react-router-dom'

function Registration() {
  return (
    <>
    <Navbars/>
    <div className='d-flex justify-content-center  mt-5 align-items-center'>
        <Link to={'shopreg'}>
        <div className="text-black d-flex  btns  justify-content-center align-items-center hover-dange fs-5 fw-bold rounded" style={{height:"200px",width:"300px",backgroundColor:"red"}}>Shop</div></Link>
        <Link to={"userreg"}>
        <div className="text-black d-flex btns ms-4 justify-content-center align-items-center fs-5 fw-bold rounded" style={{height:"200px",width:"300px",backgroundColor:"green"}}>User</div></Link>
        <Link to={"doctorreg"}>
        <div className="text-black d-flex btns ms-4 justify-content-center align-items-center fs-5 fw-bold rounded" style={{height:"200px",width:"300px",backgroundColor:"yellow"}}>Doctor</div></Link>
    </div>
    </>
  )
}

export default Registration