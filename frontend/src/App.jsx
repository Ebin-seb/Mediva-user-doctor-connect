import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Registration from './components/Registration'
import Userreg from './modules/user/Userreg'
import Shopreg from './modules/shop/shopreg'
import Login from './components/Login'
import Userhome from './modules/user/Userhome'
import Shopehome from './modules/shop/Shophome'
import Editshop from './modules/shop/Editshop'
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './modules/shop/Product'
import { DashboardContent } from './modules/shop/DashboardContent'
import ProductsAdd from './modules/shop/ProductsAdd'
import Productsedit from './modules/shop/Productsedit'
import Orders from './modules/shop/Orders'
import { UserDashboard } from './modules/user/DashboardContent'
import Useredit from './modules/user/Useredit'
import Userpurchase from './modules/user/Userpurchase'
import Productdetails from './modules/user/Productdetails'
import Userorder from './modules/user/Userorder'
import Doctorregistration from './modules/doctor/Doctorregistration'
import Doctorhome from './modules/doctor/Doctorhome'
import { DoctorDashboard } from './modules/doctor/DashboardContent'
import Doctoredit from './modules/doctor/Doctoredit'
import Userdoctorview from './modules/user/Userdoctorview'
import Doctorappointments from './modules/doctor/Doctorappointments'
import Userappointments from './modules/user/Userappointments'
import Adminhome from './modules/admin/Adminhome'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Registration/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/shopreg' element={<Shopreg/>}></Route>
        <Route path='/userreg' element={<Userreg/>}></Route>
        <Route path='doctorreg' element={<Doctorregistration/>}></Route>
        <Route path='/adminhome' element={<Adminhome/>}>
           <Route index element={<adminDashboard />} />

        </Route>
        <Route path='/userhome' element={<Userhome/>}>
          <Route index element={<UserDashboard />} />
          <Route path='edituser' element={<Useredit/>}></Route>
          <Route path='userpurchase' element={<Userpurchase/>}/>
          <Route path='productdetails/:productid' element={<Productdetails/>}></Route>
          <Route path='orders' element={<Userorder/>}></Route>
          <Route path='doctors' element={<Userdoctorview/>}></Route>
          <Route path='appointments' element={<Userappointments/>}></Route>
        </Route>
        <Route path='/shophome/:id' element={<Shopehome/>}>
          <Route index element={<DashboardContent />} />
          <Route path='editshop' element={<Editshop/>}></Route>
          <Route path='products' element={<Product/>}></Route>
          <Route path='products/addproducts' element={<ProductsAdd/>} />
          <Route path='products/editproducts/:productid' element={<Productsedit/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
        <Route path='/doctorhome' element={<Doctorhome/>}>
          <Route index element={<DoctorDashboard />} />
          <Route path='doctoredit' element={<Doctoredit/>} />
          <Route path='appointments' element={<Doctorappointments/>}></Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
