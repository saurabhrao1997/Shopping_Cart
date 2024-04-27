import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
<>
<div className='min-w-[120px] h-full pt-10 fixed top-0 left-0  bg-gray-600  px-1'>
  <ul className='flex flex-col w-full'>
    <li className='w-full hover:bg-gray-700  py-2'>  <NavLink className={({isActive})=>{ return `text-white ${isActive ? " text-white drop-shadow-lg  shadow-white  font-bold  " :"text-gray-200 "}` }} to={"/product"}>Product</NavLink></li>
    <li className='w-full hover:bg-gray-700  py-2'>  <NavLink to={"/create"} className={({isActive})=>{ return `text-white ${isActive ? "text-white drop-shadow-lg  shadow-white  font-bold " :" text-gray-200"}` }}>CreateProduct</NavLink></li>
    <li className='w-full hover:bg-gray-700  py-2'>  <NavLink to={"/users"} className={({isActive})=>{ return `text-white ${isActive ? "text-white drop-shadow-lg  shadow-white  font-bold " :" text-gray-200"}` }}>Users</NavLink></li>
    <li className='w-full hover:bg-gray-700  py-2'>  <NavLink to={"/category"} className={({isActive})=>{ return `text-white ${isActive ? "text-white drop-shadow-lg  shadow-white  font-bold " :" text-gray-200"}` }}>Category</NavLink></li>
    <li className='w-full hover:bg-gray-700  py-2'>  <NavLink to={"/order/Create"} className={({isActive})=>{ return `text-white ${isActive ? "text-white drop-shadow-lg  shadow-white  font-bold " :" text-gray-200"}` }}>Create Order</NavLink></li>
    <li className='w-full hover:bg-gray-700  py-2'>  <NavLink to={"/order"} className={({isActive})=>{ return `text-white ${isActive ? "text-white drop-shadow-lg  shadow-white  font-bold " :" text-gray-200"}` }}>Orders</NavLink></li>
  </ul>
    
 

</div>

</>
  )
}
