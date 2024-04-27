import { useEffect, useState } from 'react'
import moment from "moment"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";

import { useUpdateProductMutation } from '../../../API/Product'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addWishlist,removeWishlist } from '../../Slice/WishliatSlice';
import { useNavigate } from 'react-router-dom';
export default function ProductCard({obj,key,toast,onDelete}:any) {
  const navigate = useNavigate()
    const [update,setUpdate] = useState(false)
    const [form,setForm] = useState({})
    const [updateProduct] = useUpdateProductMutation();
    const [bookMark,setBookMark] = useState(false)
   const disPatch = useAppDispatch()
   const wishlist = useAppSelector((state)=> state.wishlist)
   const [showHover,setShowHover] = useState(false)
 

        useEffect(()=>{
 
           if(wishlist.length > 0){
         
        let aa  = wishlist.find((object)=> object._id == obj?._id)
        console.log("wishlist inside",wishlist[0]?._id,obj?._id,aa);
              if(aa){
                setBookMark(true)
              }
           }
        },[wishlist])

     useEffect(()=>{
      if(obj?.productName){
        setForm(obj)
      }

    },[obj?.productName])
    console.log("form",form)

    const upload = async(e:any)=>{
    try {
     await updateProduct(form).then((res)=>{
             console.log("response",res)
             setUpdate(false)
             toast("successfully Product updated")
     })

      
    } catch (error) {
      
    }

    }

    const onChange =(e:any)=>{
    const {name,value} = e?.target
     setForm({...form,[name]:value})
    }

    console.log("obj",obj)
  return (
    <>
      <div
        key={key}
        className="flex flex-col border-2 rounded-lg  relative transition-all "
        onClick={()=>{navigate(`/product/${obj?._id}`)}}
      >
        <img src={`http://localhost:4000/productImage/${obj?.image[0]}`} className='w-full h-48' alt="image loading" />
        <div className='my-2 flex flex-col px-2'>
        {update ? (
          <span>
            Product name :{" "}
            <input
              type="text"
              className="border-b-2"
              name="productName"
              value={form?.productName}
              onChange={onChange}
            />
          </span>
        ) : (
          <span> <span className='font-bold'>Product name : </span> {obj?.productName}</span>
        )}
        {update ? (
          <span>
            Type :{" "}
            <input
              type="text"
              className="border-b-2"
              name="Type"
              value={form?.Type?.name}
              onChange={onChange}
            />
          </span>
        ) : (
          <span><span className='font-bold'>Type : </span> {obj?.Type?.name}</span>
        )}
        {update ? (
          <span>
            Quantity :{" "}
            <input
              type="text"
              className="border-b-2"
              name="Quantity"
              value={form?.Quantity}
              onChange={onChange}
            />
          </span>
        ) : (
          <span><span className='font-bold'> Quantity :</span> {obj?.Quantity}</span>
        )}
        {update ? (
          <span>
            Price :{" "}
            <input
              type="text"
              className="border-b-2"
              name="Price"
              value={form?.Price}
              onChange={onChange}
            />
          </span>
        ) : (
          <span> <span  className='font-bold'>Price : </span> {obj?.Price}</span>
        )}
        <span>
       <span className='font-bold'>Available from : </span>   {moment(obj?.createdAt).format("MMM Do YY")}
        </span>
        {!update && (
          <div className="transition-all  bg-blue-400 rounded-full absolute bottom-2 right-4 hover:px-4 py-2 flex hover:gap-2  " onClick={(e)=>{e.stopPropagation()}} onMouseEnter={()=>{setShowHover(true)}} onMouseLeave={()=>{setShowHover(false)}}>
            <button
              className={`text-white  ${ !showHover && "px-2"}`} 
              onClick={() => {
                setUpdate(true);

              }}
            >
              {" "}
              <MdEdit/>
            </button>
         {showHover &&(<>   <button
              className=" text-white bg-blue-400 rounded-full"
              onClick={() => {
                onDelete(obj?._id);
              }}
            >
              {" "}
              <MdDelete  style={{width:"20px", height:"20px"}}  />
            </button>
            <button className='' onClick={()=>{setBookMark(!bookMark);if(bookMark){disPatch(removeWishlist(obj))}else{disPatch(addWishlist(obj))}}}>
            <FaBookmark  fill={bookMark ? "black"  :'white'} width={"12"} height={"12"}/>
            </button> </>)}
          </div>
        )}
        {update && (
          <button className="px-4 py-1 text-white bg-blue-400" onClick={upload}>
            upload
          </button>
        )}
        </div>
      </div>
    </>
  );
}
