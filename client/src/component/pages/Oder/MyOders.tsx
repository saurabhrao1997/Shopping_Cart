import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetOrderQuery } from '../../../API/Order'
import Modal from '../../Comman/Modal'

export default function MyOders() {
    const [showModal,setShowModal] = useState(false)
    const [id,setId] =useState("")
    const {data} = useGetOrderQuery()
    const [deleteOrder] = useDeleteOrderMutation()
    console.log("orders",data,id)
  return (

    <>
    <div className='text-center my-2'>MyOders</div>
    <div className='border-2'>
        {
            data && data.data.map((obj)=>{
                return (
                <div>
                      <div>
                        {
                           obj?.productIds[0] && obj?.productIds.map((item)=>{
                             return  (
                                <div className='w-full bg-blue-gray-900 px-4 py-1 rounded-lg flex justify-between my-4'>
                                     <div>
                                        <img src={`http://localhost:4000/productImage/${item?.image[0]}`} className='w-32 h-32 rounded-lg ' alt="img" />
                                     </div>
                                     <div className='w-3/4'>
                                     <div> productName : {item?.productName}</div>
                                    <div>Brand: {item?.Brand}</div>
                                    <div>Quantity : 1</div>
                                    <div>Price : {item?.Price}</div>

                                     </div>
                                  
                                </div>
                             )
                           })
                        }
                      </div>



                    <div className='px-2'>
                      <div>Address: {obj?.address}</div>
                      <div>City: {obj?.city}</div>
                      <div>Mobile Number: {obj?.mobile}</div>
                      <div>Pin Code: {obj?.mobile}</div>
                      <div>
                            total Price : {obj?.totalPrice}
                        </div>
                        <button className='px-2 py-1 border' onClick={()=>{setShowModal(true);setId(obj?._id) }}>Cancel order</button>
                    </div>
                    <div>
                       
                    </div>
                </div>
                )
            })
        }
       
    </div>
    <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        heading={"Are you sure to cancel to order ?"}
        content={""}
        onClick={() => {
            deleteOrder(id)
            .then((res) => {
              setShowModal(false);
              setId("")
            })
            .catch((err) => {
              console.log(err);
              setShowModal(false);
            });
        }}
      />
    
    </>
  )
}
