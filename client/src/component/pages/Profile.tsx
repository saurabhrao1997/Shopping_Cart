import moment from 'moment'
import React, { useEffect } from 'react'
import { useAuth } from '../Hook/useAuth'
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Profile() {
     let {newUser} = useAuth()
   
 console.log("user",newUser)

  return (
   <>

   <div className=' w-full flex flex-col justify-center items-center pt-20'>
  
   {
    newUser &&(<>
     <span className=' my-2 text-sm font-bold text-[24px]'>Profile</span>
    <div className='flex  flex-col gap-y-4'>
      <div className='w-full flex justify-center'> 
      <IoPersonCircleOutline className='w-20 h-20' />
      </div>


    <div><span className='font-bold text-sm '>Name :</span> {newUser.sname} {newUser.lname}</div>
    <div><span className='font-bold text-sm '>Email ID :</span> {newUser.email}</div>
    <div><span className='font-bold text-sm '>Role :</span>{newUser.role}</div>
    <div><span className='font-bold text-sm '>Account Created : </span>{moment(newUser?.createdAt).format("MMM Do YY")}</div>
    </div>
    </>)
   }
   </div>
   
   </>
  )
}
