import React, { useState } from 'react'
import { useCreateCategoryMutation,useGetCategoryQuery, useUpdateCategoryMutation,useDeleteCategoryMutation } from '../../../API/Category'
import { RxCross1 } from "react-icons/rx";
export default function CreateCategory() {
   const [categoryname ,setCategoryName] = useState({name:""})
   const [selectedCategory,setSelectedCategory] = useState({selectedId:"",updatedVal:""})
   const [createCategory] = useCreateCategoryMutation()
   const [updateCategory] = useUpdateCategoryMutation()
   const [deleteCategory] = useDeleteCategoryMutation()
   const {data} = useGetCategoryQuery()
console.log("data",data?.data)
    const onchange =(e)=>{
        setCategoryName({name: e?.target?.value})
    }



  
  return (
<>
<div className='text-center'>Category</div>
<div className='border-2 py-2 px-2 my-2'>
  <div className='font-bold text-[18px] my-2'> Add Category</div>
<div className='flex items-center gap-2'>
    <input type="text" placeholder='add category' className='text-black' onChange={onchange}/>
    <button className='px-2 border-2 text-white  bg-slate-700' onClick={()=>{
        createCategory(categoryname).then((res)=>{
            console.log("res",res)
        }).catch((err)=>{
          console.log("err",err)
        })
    }}>
        Category
    </button>
</div>
<div className='my-2 flex gap-2'>
  {
    data?.data && data?.data.map((obj)=>{
         return (
          <span className='border px-1'>{obj?.name}</span>
         )
    })
  }  
</div>

</div>
<div className='border-2 py-2 px-2 my-2'>
  <div className='font-bold text-[18px] my-2'> Update Category</div>
<div className='flex items-center gap-2 flex-wrap'>
    <input type="text" className='text-black' placeholder='update category' onChange={(e)=>{setSelectedCategory((pre)=> ({...pre,updatedVal:e?.target?.value}))}}/>
    <select name="" id="" className='bg-[#224940] w-[200px] bottom-2 py-1 px-1' onChange={(e)=>{setSelectedCategory((pre)=> ({...pre,selectedId:e?.target?.value}))}}>
      <option value=""></option>
      {data?.data && 
        data?.data.map((obj)=>{
            return(
              <option className='' value={obj?._id}>{obj?.name}</option>
            )
        })
      }
    
    </select>
    <button className='px-2 border-2 text-white  bg-slate-700' onClick={()=>{
        updateCategory(selectedCategory).then((res)=>{
            console.log("res",res)
        }).catch((err)=>{
          console.log("err",err)
        })
    }}>
        Category
    </button>
</div>
<div className='my-2 flex gap-2 flex-wrap'>
  {
    data?.data && data?.data.map((obj)=>{
         return (
          <span className='border px-1'>{obj?.name}</span>
         )
    })
  }  
</div>

</div>


<div className='py-2 my-2 border-2'>
  <div className='my-2 font-bold text-[18px]'>Delete Category</div>
<div className='my-2 flex gap-2 flex-wrap'>
  {
    data?.data && data?.data.map((obj)=>{
         return (
          <span className='border px-2 py-1 relative cursor-pointer' onClick={()=>{deleteCategory(obj?._id)}}>{obj?.name} <span className='absolute top-[-6px] right-[-1]'><RxCross1 /></span></span>
         )
    })
  }  
</div>
</div>


</>
  )
}
