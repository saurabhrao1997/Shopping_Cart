
import React, { useEffect, useState } from 'react'
import {useGetAllUserQuery} from "../../../API/user"
import Table from "../../Comman/ReactTable/Table"


interface enw {
  name:string,
  lname:string,
  email:string,
  role:string
}
export default function Users() {
const [users,setAllUsers] = useState<enw[]>([])
const {data} =useGetAllUserQuery()
useEffect(()=>{
  if(data?.data){

let newArray = [...data?.data]

 let bb : enw[]= newArray.map((val)=>{
return {
  name : val?.sname,
  lname: val?.lname,
  email :val?.email,
  role : val?.role,

}
})

console.log("newArray", newArray,bb)
    setAllUsers(bb)
  }
},[data?.data])



console.log("data",data)



console.log("user",users)


const  columns= [
  {    header:"First Name",
      accessorKey :"name",

  },
  {    header:"Last Name",
  accessorKey :"lname",

},
{    header:"Email",
accessorKey :"email",

},
{    header:"Role",
accessorKey :"role",

},

]
  return (
<>
<div className='w-full min-h-[90%] '>
<div className='text-center'>Home</div>
<Table columns={columns || []} data={users || []}/>


</div>



</>
  )
}

