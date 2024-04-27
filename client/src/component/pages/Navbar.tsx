
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { PiLockKeyOpen } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaDragon } from "react-icons/fa";
import { useAuth } from '../Hook/useAuth';

export default function Navbar() {
  const wishlist = useAppSelector((state)=> state.wishlist.items)
   const {isAdmin,isManager} =   useAuth()
  return (
<>
<div className=' w-full bg-black bg-opacity-50 text-white py-2 transition-all duration-300 fixed top-0 left-0 z-50'>
  <div className='flex justify-between'>
  <div className='ml-32 flex '>
  <FaDragon/>
  <span className='font-bold'>hopping Mart</span>
  </div>
  <div className='flex justify-end items-center gap-4 mr-10'>

     <NavLink to={"/home"} className={({isActive})=> `${isActive ? "transiTion-all text-yellow-400 underline" : ""} transition-all hover:scale-110` }><IoHomeOutline style={{width:"25px", height:"25px"}}/></NavLink>
     {/* <NavLink to={"/about"} className={({isActive})=>isActive ? " text-gray-400 underline" : "" }>About</NavLink> */}
     <NavLink to={"/contact"} className={({isActive})=> `${isActive ? "transiTion-all text-yellow-400 underline" : ""} transition-all hover:scale-110` }> <IoIosContacts style={{width:"25px", height:"25px"}}/></NavLink>
   
     <NavLink to={"/profile"} className={({isActive})=> `${isActive ? "transiTion-all text-yellow-400 underline" : ""} transition-all hover:scale-110` }> <IoPersonCircleOutline style={{width:"25px", height:"25px"}}/></NavLink>
     <NavLink className={({isActive})=>      `flex justify-center items-center transiTion-all ${isActive  &&  "text-gray-400"} transition-all hover:scale-110`} to={"/wishlist"}>  <MdOutlineShoppingCart style={{width:"25px", height:"25px"}}/> <span className='bg-red-400 rounded-full px-1 text-white relative top-[-10px] text-sm'>{wishlist.length > 0  && wishlist.length }</span></NavLink>
     <NavLink to={"/login"} className={({isActive})=> `${isActive ? "transiTion-all text-yellow-400 underline" : "" } transition-all hover:scale-110`} onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("user")}}><PiLockKeyOpen style={{width:"25px", height:"25px"}}/></NavLink>
      {/* <NavLink to={""} className={({isActive})=> `${isActive ? "transiTion-all text-yellow-400 underline" : "" } transition-all hover:scale-110`}>logout</NavLink> */}
     


  </div>

  </div>


</div>


</>
  )
}
