import React, { useEffect, useState } from 'react'
import { CarouselIndex } from '../Comman/Carousel'

import Mobile from "../../../public/Mobile.jpg"
import Appliance from "../../../public/Appliance.jpg"
import Cloths2 from "../../../public/Cloths2.jpg"
import Grocery from "../../../public/Grocery.jpg"
import Watch from "../../../public/Watch.jpg"
import Shoes from "../../../public/Shoes.jpg"
import { useAppSelector } from '../../hooks'
import { useGetAllProductQuery } from '../../API/Product'

export default function Home() {
  const [filter,setFilter] = useState({
    search:""
  })
  const { data } = useGetAllProductQuery(filter);
console.log("product home",data?.data[0]?.image
)
  let aa  = "WelCome my Shopping Mart"
   let bb  = aa.split("")
console.log("bb",bb)
  return (
<>
<div className='w-full h-[90%] '>
<div className='text-center'>Home</div>
<div className='flex gap-6 justify-center'>
  <div className='text-center transition-all hover:scale-110 hover:font-bold'> <img src={Mobile} className='w-32 h-12 rounded-lg ' alt="Mobile" onClick={()=>{setFilter({search:"Mobile"})}}/> Mobile </div>
  <div className='text-center transition-all hover:scale-110 hover:font-bold'><img src={Cloths2}  className='w-32 h-12 rounded-lg' alt="Cloth" onClick={()=>{setFilter({search:"Cloth"})}} /> Mens Wear </div>
  <div className='text-center transition-all hover:scale-110 hover:font-bold'><img src={Grocery}  className='w-32 h-12 rounded-lg' alt="Grocery" onClick={()=>{setFilter({search:"Grocery"})}} /> Grocery </div>
  <div className='text-center transition-all hover:scale-110 hover:font-bold'> <img src={Appliance}  className='w-32 h-12 rounded-lg' alt="Appliance" onClick={()=>{setFilter({search:"Appliance"})}} /> Appliances </div>
  <div className='text-center transition-all hover:scale-110 hover:font-bold'> <img src={Watch}  className='w-32 h-12 rounded-lg' alt="watch" onClick={()=>{setFilter({search:"Watch"})}}  /> Watch </div>
  <div className='text-center transition-all hover:scale-110 hover:font-bold'> <img src={Shoes}  className='w-32 h-12 rounded-lg' alt="watch" onClick={()=>{setFilter({search:"Shoes"})}}  /> Shoes </div>
</div>


<div className='w-[90%] text-center font-bold text-7xl my-20  px-4 py-4 bg-gradien-to-t from-cyan-500 to-blue-500 hover:animate-wiggle '>{
  bb.map((val)=>{
    return(
      <span className='transition-all hover:hover:drop-shadow-l hover:scale-110 cursor-pointer hover:text-gray-400  '>{val}</span>
    )
  })
} </div>

{/* <CarouselIndex/> */}
<div className='w-full border-2 px-4 rounded-md'>
  <div className='my-4 font-bold'>
    Offer Product
  </div>


<div className=' flex-wrap gap-10 grid grid-cols-4'>

{
  data?.data.map((obj)=>{
    return(
      <>
      <div className='border-2 px-2 py-1'>
      <img src={`http://localhost:4000/productImage/${obj?.image[0]}`} className='w-96 h-60' alt="" />
    
    <div className='text-center my-2 text-wrap'>{obj?.productName}</div>    

      </div>
  
    </>
   )
  })
}
  </div>


  </div>


</div>



</>
  )
}
