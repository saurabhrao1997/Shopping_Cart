import React, { useState } from 'react'
import { useAddReviewMutation, useGetSingleProductQuery } from '../../../API/Product'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Rating } from "@material-tailwind/react";

import { useAuth } from '../../Hook/useAuth'

export default function ProductDetails() {
  let {newUser} = useAuth()
  let    {id}   =  useParams()
   
  console.log("user",newUser)
  const [Review,setReview] = useState({rating:0,comment:"",userDetails:newUser,productId:id})
  const [addReview] = useAddReviewMutation()
  const [imageIndx,setImageInx] = useState(0)

  let {data} = useGetSingleProductQuery(id ,{skip:!id})
  console.log("id",id,data)
  
  return (
    <>
        <div className='text-center'>ProductDetails</div>
         
        <div className='w-full '>
        {
            data?.data[0] && data?.data.map((obj,ind)=>{
                return (
                    <>
                    <div
                      key={ind}
                      className="flex w-full rounded-lg transition-all "
                    //   onClick={()=>{navigate(`/product/${obj?._id}`)}}
                    >
                      <div className='w-full h-full flex'>
                      <img src={`http://localhost:4000/productImage/${obj?.image[imageIndx]}`} className='w-3/4' alt="image loading" />
                     {obj?.image.length > 1 &&  <div className='flex flex-col w-full'>
                        {obj?.image.map((img,inxx)=>{

                        return  <img src={`http://localhost:4000/productImage/${img}`} className='w-full h-32 transition-all hover:scale-105' alt="image loading" onClick={()=>{setImageInx(inxx)}} />
                        })

                        }

                      </div>}
                      
                      </div>
                    
                      <div className='my-2 flex flex-col px-2'>
                      {/* {update ? (
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
                      ) : ( */}
                        <span> <span className='font-bold'>Product name : </span> {obj?.productName}</span>
                        <span> <span className='font-bold'>Description :</span>{obj?.Description}</span>
                        <span> <span className='font-bold'>Brand :</span>{obj?.Brand}</span>
                        <span> <span className='font-bold'>Rating :</span> <Rating placeholder={"rating"} unratedColor="amber" ratedColor="amber" value={Math.ceil(obj?.Rating)} readonly /> {" "}Based on {obj?.numReview} Reviews</span>
                    {/* //   )} */}
                      {/* {update ? (
                        <span>
                          Type :{" "}
                          <input
                            type="text"
                            className="border-b-2"
                            name="Type"
                            value={form?.Type}
                            onChange={onChange}
                          />
                        </span>
                      ) : ( */}
                        <span><span className='font-bold'>Type : </span> {obj?.Type?.name}</span>
                    {/* //   )} */}
                      {/* {update ? (
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
                      ) : ( */}
                        <span><span className='font-bold'> Quantity :</span> {obj?.Quantity}</span>
                    {/* //    )} */}
                      {/* {update ? (
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
                      ) : ( */}
                        <span> <span  className='font-bold'>Price : </span> {obj?.Price}</span>
                       {/* )} */}
                       {/* <span> <span  className='font-bold'>Barnd : </span> {obj?.Brand}</span> */}
                       {/* <span> <span  className='font-bold'>Barnd : </span> {obj?.Brand}</span> */}
                      <span>
                     <span className='font-bold'>Available from : </span>   {moment(obj?.createdAt).format("MMM Do YY")}
                      </span>
                      {/* {!update && (
                        <div className="transition-all  bg-blue-400 rounded-full absolute bottom-2 right-4 hover:px-4 py-2 flex hover:gap-2  " onMouseEnter={()=>{setShowHover(true)}} onMouseLeave={()=>{setShowHover(false)}}>
                          <button
                            className={`text-white  ${ !showHover && "px-2"}`} 
                            onClick={() => {
                            //   setUpdate(true);
                            }}
                          >
                            {" "}
                            <MdEdit/>
                          </button>
                       {showHover &&(<>   <button
                            className=" text-white bg-blue-400 rounded-full"
                            onClick={() => {
                            //   onDelete(obj?._id);
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
                      )} */}
                      </div>
                    </div>
                  </>
                )
            })
        } 

      

        </div>

        <div className='my-4 border-2  flex flex-col gap-2 px-4 py-1'>
         <div className='text-[18px] font-bold'>Add Review</div>
         <div>
           <div>Rating</div>
         {/* <input type="number" className='text-black' name='rating' placeholder='rating' onChange={(e)=>{setReview((pre)=>({...pre,rating:Number(value)}))}} /> */}
         <Rating placeholder={"rating"} unratedColor="amber" ratedColor="amber" defaultValue={0}  onChange={(value)=>{setReview((pre)=>({...pre,rating:Number(value)}));console.log("rating",value)}} /> 
         </div>
         <div>
         <div>Comment</div>
         <textarea name="comment" className='text-black' id="" cols={30} rows={3} onChange={(e)=>{setReview((pre)=>({...pre,comment:e.target?.value}))}}/>
         </div>
         <div>
         <button className='border-2 px-4' onClick={()=>{addReview(Review)}}>
           submit
         </button>
          
         </div>
       
        </div>

        <div className='border-2 my-2 px-4 py-1'>
          <div className='text-[18px] font-bold my-2'>Review</div>
         { data?.data[0] && data?.data[0]?.Review.map((obj)=>{
          return(
            <div className='border-2 rounded-md my-2 px-4'>
              <div className='font-bold'>{obj?.name}</div>
              <div><Rating placeholder={"rating"} unratedColor="amber" ratedColor="amber" value={obj?.rating} readonly /> </div>
              <div>{obj?.comment}</div>
              {/* <div>{obj?.comment}</div> */}
            </div>
          )
         })
         
         
         
         }

        </div>
    </>

  )
}
