import React, { useState } from 'react'
import Navbars from './Navbars'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("") 
  const navigate = useNavigate()
  // const [role,setrole]=useState("")

  const validate= async(e)=>{
    e.preventDefault()
    const body = {username,password}
    console.log(body)
    try{
    const response = await axios.post("http://localhost:8000/api/auth/",body)
    const role = response.data.usr.role
    console.log(response)
    if(role == "user"){
      localStorage.setItem('userlogid',response.data.usr._id)
    navigate('/userhome')
    }
    else if(role == "shop"){
      let id = response.data.usr._id;
      navigate(`/shophome/${id}`)
    }
    else if(role == "doctor"){
      localStorage.setItem('doctorlogid',response.data.usr._id)
      navigate(`/doctorhome`)
    }
    else if(role == "admin"){
      localStorage.setItem('adminlogid',response.data.usr._id)
      navigate(`/adminhome`)
    }
    else{
      alert("credentials invalid")
    }
  }
    catch(error){
      console.log(error)
    }
  } 

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-black" style={{ minHeight: "100vh" }}>
        <div className="bg-dark text-white rounded p-5 shadow" style={{ width: "450px",minHeight:"400px" }}>
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={validate}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username or email"
                onChange={(e)=>setusername(e.target.value)}
                />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e)=>setpassword(e.target.value)}

              />
            </div>
            <div className='text-center mt-5'>
            <button type="submit" className="btn btn-primary w-50">
              Login
            </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
