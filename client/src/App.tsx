import { useState,lazy,Suspense, useEffect } from 'react'

import './App.scss'
import { Routes,Route,useLocation ,useNavigate,Outlet} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import fallbackRender from './component/Comman/ErrorBondries'
import Sidebar from './component/pages/Sidebar'
import { useAuth } from './component/Hook/useAuth'
import Users from './component/pages/Product/Users'
import Footer from './component/Comman/Footer'
import { DiVim } from 'react-icons/di'
import ProductDetails from './component/pages/Product/ProductDetails'
import Loader from './component/Comman/Loader'
// import Login from './component/pages/Login'
// import Home from './component/pages/Home'
// import Navbar from './component/pages/Navbar'
// import Register from './component/pages/Register'


const Login = lazy(()=> import('./component/pages/Login'))
const Home = lazy(()=> import('./component/pages/Home'))
const About = lazy(()=> import('./component/pages/About'))
const Contact = lazy(()=> import('./component/pages/Contact'))
const Profile = lazy(()=> import('./component/pages/Profile'))
const Navbar = lazy(()=> import('./component/pages/Navbar'))
const Register = lazy(()=> import('./component/pages/Register'))
const Product = lazy(()=> import('./component/pages/Product/ProductIndex'))
const ProductCreate = lazy(()=> import('./component/pages/Product/ProductCreate'))
const Wishlist = lazy(()=> import('./component/pages/Product/Wishlist'))
const Category = lazy(()=> import('./component/pages/Category/CreateCategory'))
const CreateOrder = lazy(()=> import('./component/pages/Oder/CreateOder'))
const MyOrders = lazy(()=> import('./component/pages/Oder/MyOders'))

function App() {
  const val = useAuth()
  console.log("decode",val)
  const navigate = useNavigate()
const location = useLocation()
console.log("location",location.pathname.includes("register"))

useEffect(()=>{
  if(!localStorage.getItem("token")){
    navigate("/login")       
  }
 
},[])

  return (
    <>
      <ErrorBoundary FallbackComponent={fallbackRender}>
        <Suspense fallback={<div className='absolute left-0 top-0 w-full h-screen  bg-[#224952]'>    <Loader/></div>}>
          <div className="flex flex-col bg-[#224952] min-h-screen text-white">
            <div>
           {( !(location.pathname.includes("register")) && !(location.pathname.includes("login")) )  &&  <Navbar />}
            </div>
            <div className='flex'>
              <div>
            {(!(location.pathname.includes("register")) && !(location.pathname.includes("login")))  &&    <Sidebar />}
              </div>

              <div className={` w-full ${!(location.pathname.includes("register")) && "ml-32 mt-10 mb-32"}`}>
                <Routes>
                  <Route path="/login" element={<Login />}>
                    Login
                  </Route>
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/contact" element={<Contact />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/product" element={<Product />}> </Route>
                  <Route  path="/product/:id" element={<ProductDetails />}> </Route>
                  <Route path="/create" element={<ProductCreate />}></Route>
                  <Route path="/wishlist" element={<Wishlist />}></Route>
                  <Route path="/users" element={<Users />}></Route>
                  <Route path="/category" element={<Category />}></Route>
                  <Route path="/order/Create" element={<CreateOrder />}></Route>
                  <Route path="/order" element={<MyOrders />}></Route>
               
                </Routes>
               {!(location.pathname.includes("register")) && <div className='w-full'>
                <Footer/>
              </div>}
              </div>
             
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App
