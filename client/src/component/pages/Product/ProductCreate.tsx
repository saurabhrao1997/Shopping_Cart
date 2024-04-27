import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useCreateProductMutation} from "../../../API/Product"
import ImageDropZone  from "../../Comman/ImageDropZone"
import { useGetCategoryQuery } from '../../../API/Category';
interface formPros {
    productName:string;
    Quantity:string;
    Price:string;
    Type:string;
    image:any;

}
export default function ProductCreate() {
  const navegate = useNavigate()
  const [showModal,setShowModal] = useState(false)
const [form,setForm] = useState<formPros[]>({
    productName:"",
    Quantity:"",
    Price:"",
    Type:"",
    image: ""
})
const [createProduct] = useCreateProductMutation()
const {data:category} = useGetCategoryQuery()
    const onSubmit = async(e:any)=>{
    e.preventDefault()
    const data = new FormData();
  
    Array.from(form?.image).forEach((imagess,index)=>{
     data.append("productImage",imagess,imagess.name)
    })
    data.append("productName" ,form?.productName)
    data.append("Quantity" ,form?.Quantity)
    data.append("Price" ,form.Price)
    data.append("Type" ,form.Type)
    // data.append("image",form?.image?.name )
    data.append("Brand",form?.Brand )
    data.append("Description",form?.Description )
  

    createProduct(data).then((res)=>{
       console.log("res",res)
         if(res?.error?.status){
        return null
       }else{
       return navegate("/product")
       }    
     
    }).catch((err)=>{
       console.log("err",err)
    })

    }

const onChange = (e:any)=>{
      
     const   {name ,value,files}  = e?.target
     console.log("onChange",name,value,files)
     if(name == "image" ){
      setForm({...form,[name]: files})
     }else{
      setForm({...form,[name]:value})
     }
     

}
console.log("form",form)




  return (
    <>
      <div className='text-center'>ProductCreate</div>
    <div className='my-4'>
      <div className='flex justify-center items-center gap-y-4  border-blue-200 rounded-lg shadow-lg px-4 py-1'>
      <form action="flex justify-center items-center gap-y-4 border-2 border-blue-200 rounded-lg shadow-lg px-4 py-1" onSubmit={onSubmit}>
        <div className='font-bold text-center'>Add Product in list</div>
        <div className='flex flex-col gap-2 my-2 '>
        <label htmlFor="image">Product Images :</label>
        {/* <input type="file" name="image" id="image" className='border border-blue-300 rounded-md' onChange={onChange}/> */}
           <ImageDropZone submitFunction={onChange} />
        </div>
        <div className='flex flex-col gap-2 my-2 justify-end'>
        <label htmlFor="productName">Product name :</label>
        <input type="text" name="productName" id="productName" className='border border-blue-300 rounded-md text-black' onChange={onChange}/>

        </div>
        <div className='flex flex-col gap-2 my-2 justify-end'>
        <label htmlFor="description">Description :</label>
        {/* <input type="text" name="productName" id="productName" className='border border-blue-300 rounded-md' onChange={onChange}/> */}
        <textarea id="description" name="Description" rows={4} cols={50} className='text-black' onChange={onChange}/>
        </div>
        <div className='flex flex-col gap-2 my-2 justify-end'>
        <label htmlFor="Brand">Brand :</label>
        <input type="text" name="Brand" id="Quantity" className='border border-blue-300 rounded-md text-black' onChange={onChange}/>

        </div>
        <div className='flex flex-col gap-2 my-2 justify-end'>
        <label htmlFor="Quantity">Quantity :</label>
        <input type="text" name="Quantity" id="Quantity" className='border border-blue-300 rounded-md text-black' onChange={onChange}/>

        </div>
        <div className='flex flex-col gap-2 my-2 justify-end'>
        <label htmlFor="Price">Price :</label>
        <input type="text" name="Price" id="Price" className='border border-blue-300 rounded-md text-black' onChange={onChange} />

        </div>
        <div className='flex flex-col gap-2 my-2 justify-end'>
        <label htmlFor="Type">Type :</label>
        {/* <input type="text" name="Type" id="Type" className='border border-blue-300 rounded-md' onChange={onChange}/> */}
          <select name="Type" className=' bg-red-900' id="" onChange={onChange}>
          <option value={""}></option>
            {
              category?.data && category?.data.map((obj)=>{
                return (
                  <option value={obj?._id}>{obj?.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className='flex flex-col justify-center'>
        <button type='submit' className='px-4 py-1 bg-blue-500 hover:bg-slate-400 text-white rounded-lg'>
            submit
        </button>

        </div>
      

     </form>

      </div>
   

    </div>
 
    
    </>
  
  )
}
