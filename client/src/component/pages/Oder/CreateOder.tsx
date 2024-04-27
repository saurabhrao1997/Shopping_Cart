import React,{useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Table from '../../Comman/ReactTable/Table';
import ExtraFeature from '../../Comman/ExtraFeature';
import { removeWishlist } from '../../Slice/WishliatSlice';
import { useCreateOrderMutation } from '../../../API/Order';
import { useNavigate } from 'react-router-dom';

export default function CreateOder() {
const navigate = useNavigate()
//// step 1

  const [step,setStep] = useState(1)
  const [AddressForm,setAderssForm] = useState({
    email:"",
    mobile:null,
    address:"",
    city:"",
    pinCode:null,


  })

  const onchange =(e)=>{
    const {name,value} = e.target;
    if( name && value){
      
      setAderssForm((pre)=> ({...pre,[name]:value}))

    }
  }
  console.log("AddressForm",AddressForm)
  const {email,mobile,city,pinCode,address} = AddressForm

// setp == 2

const [createOrder] =useCreateOrderMutation()
const {items,tax,shippingCharge,totalPrices} = useAppSelector((state)=> state.wishlist)

const dispatch = useAppDispatch()
console.log("Wishlist",items,tax,shippingCharge,totalPrices)



   const columns = [
    {
      header: " Product Image",
      accessorKey: "image" ,
      cell:(row)=>( <img src={`http://localhost:4000/productImage/${row.getValue()[0]}`} alt='image loading' className='w-32 h-20'/>)   
    },
     { header: "ProductName", 
     accessorKey: "productName" ,   
      cell: (row) => ( <span className="text-wrap truncate">{row?.getValue()}</span>) , 
      size:200},

     { header: "Type",
      accessorKey: "Type" ,    
        cell: (row) => ( <span className="text-wrap truncate">{row?.getValue().name}</span>)  },
    
        { header: "Price", accessorKey: "Price" },
    
        { header: "Quantity", accessorKey: "Quantity" },
   ];
    

  return (
    <>
    <div className='text-center my-2'>Create Order</div>
    <div className='w-full flex justify-center gap-32'>
      <div className={` px-3 py-1 rounded-full ${step >= 1 ? "bg-red-400" : ""}`}>1</div>
      <div className={`px-3 py-1 rounded-full ${step >= 2 ? "bg-red-400" : ""}`}>2</div>
      {/* <div className={`px-3 py-1 rounded-full ${step >= 3 ? "bg-red-400" : ""}`}>3</div> */}

    </div>
    <div className='flex flex-col justify-center  my-4 divide-y-2 gap-y-10'>
   {step >= 1 && <div className='w-1/2 flex flex-col gap-y-2 self-center'>
      <div>Shipping Address</div>
      <div>
        <span>Email</span>
        <input type="text" name={"email"} className='w-full text-black' value={email} onChange={onchange} />
      </div>
      <div>
        <span>Mobile Number</span>
        <input type="number" name={"mobile"} className='w-full text-black' value={mobile || ""} onChange={onchange}  />
      </div>
      <div>
        <span>Address</span>
        <textarea name={"address"}  className='w-full text-black' value={address} onChange={onchange}  />

      </div>
      <div>
        <span>City</span>
        <input type='text'  name="city"  className='w-full text-black' value={city || ""} onChange={onchange}  />
        
      </div>
      <div>
        <span>Pin code</span>
        <input type='number' name='pinCode'  className='w-full text-black' value={pinCode || ""} onChange={onchange}  />
        
      </div>
      <div>
        <button className='border px-2 py-1' type='button' onClick={()=>{
          
          if(email && mobile && city && pinCode && address ){
            setStep(2)
          }
        }}>
         Next
        </button>
      </div>
    </div>}


    {
      step >= 2 && <div>
        <div  className='text-center my-2'>Order Items</div>
        <div className='w-full'>
     
        <Table extraFeature={true}   data={items || []} columns={columns || []} featureFun={(row)=>{
          return <ExtraFeature onDelete={()=>{
            console.log("row",row.original)
            dispatch(removeWishlist(row.original))
          }}/>
        }}/>
        </div>
        <div className='w-full py-2 px-2 rounded-lg bg-blue-gray-700 my-4'>
            <div className='text-[18px] my-2 font-bold'>Summary</div>
            <div className='flex  mr-10'>
          {items.length > 0 &&  <div className=' '>
            <div>Total Items : <span>{items?.length}</span></div>
            <div>Items Price : <span>{totalPrices}</span></div>
            <div>Shipping Charges : <span>{shippingCharge}</span></div>
            <div>Tax : <span>{tax}</span></div>
            <div>Total Price : <span>{tax + totalPrices}</span></div>

            </div>}

            </div>
          
           
        </div>
        <div>
        <button className='border px-2 py-1' type='button' onClick={()=>{
          
          if(items.length > 0 ){
            // setStep(3)
            const formData = {
              email:email,
              mobile:mobile,
              address:address,
              city:city,
              pinCode:pinCode,
              tax:tax,
              shippingCharge:shippingCharge,
              itemsPrice:totalPrices,
              totalPrice:Number(totalPrices) + Number(tax) + Number(shippingCharge) ,
              productIds: items.map((obj)=> obj?._id),
         }

          createOrder(formData).then((res)=>{
            navigate("/order")
          })
         

          }
          
        }}>
         Next
        </button>
      </div>
      </div> 
    }

    </div>
    
    </>
  )
}



