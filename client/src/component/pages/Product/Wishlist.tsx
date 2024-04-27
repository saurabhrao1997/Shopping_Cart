
import Table from '../../Comman/ReactTable/Table'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import ExtraFeature from '../../Comman/ExtraFeature'
import { removeWishlist } from '../../Slice/WishliatSlice'
export default function Wishlist() {
  const Wishlist = useAppSelector((state)=> state.wishlist.items)
  const dispatch = useAppDispatch()
  console.log("Wishlist",Wishlist)
 


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
    <><div className='w-full'>
         <div className='text-center'>Wishlist</div>
        <Table extraFeature={true}   data={Wishlist || []} columns={columns || []} featureFun={(row)=>{
          return <ExtraFeature onDelete={()=>{
            console.log("row",row.original)
            dispatch(removeWishlist(row.original))
          }}/>
        }}/>

    </div>
       
    
    </>

  )
}
