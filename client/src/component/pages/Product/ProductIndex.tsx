import { useEffect, useState } from 'react'
import {useGetAllProductQuery} from "../../../API/Product"

import ProductCard from './ProductCard'
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../Comman/Modal';
import { useDeleteProductMutation} from '../../../API/Product'
import Loader from '../../Comman/Loader';
import { useGetCategoryQuery } from '../../../API/Category';

export default function ProductIndex() {
  const [filter,setFilter] = useState({
    search:"",
    category:[]
  })
  const [deleteProduct] = useDeleteProductMutation();
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [Search,setSearch] = useState()
  const [id, setId] = useState<number | string>("");
  console.log("id", id);
  const { data,isLoading } = useGetAllProductQuery(filter);
  const {data:categoryData} = useGetCategoryQuery()
  useEffect(() => {
    if (data?.data) {
      setProduct(data?.data);
    }
  }, [data]);

console.log("category",categoryData)
  return (
    <>
      <div className="w-full  mx-auto">
        <div className="text-center">ProductIndex</div>
        <div className='w-full flex justify-end h-full items-center gap-2 px-4'> 
          <input type="text" className='px-1 w-1/2 border-2 border-black text-gray-600' placeholder='Search product...' 
          onChange={(e)=>{setSearch(e?.target?.value); if(e?.target?.value == ""){setFilter({...filter,search:""})}}} /> <div className='h-full px-4 py-[2px]  bg-black text-white transition-all hover:bg-gray-600 cursor-pointer' onClick={()=>{setFilter({...filter,search:Search})}}>Search</div>
        </div>
        <div className='flex'>
        <div className="grid grid-cols-5 gap-4 px-2 my-10 ">
          {product?.length > 0 &&
            product?.map((obj, index) => {
              return (
                <>
                  <ProductCard
                    obj={obj}
                    key={index}
                    toast={toast}
                    onDelete={(deleteId:number  | string) => {
                      setId(deleteId);
                      setShowModal(true);
                    }}
                  />
                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                      // Define default options
                      className: "bg-red-400 text-white",
                      duration: 5000,
                      style: {
                        background: "#363636",
                        color: "#fff",
                      },

                      // Default options for specific types
                      success: {
                        duration: 1000,
                        theme: {
                          primary: "green",
                          secondary: "black",
                        },
                      },
                    }}
                  />
                </>
              );
            })}
        </div>
        <div className='border border-blue-500 px-4 py-1  h-full bg-blue-gray-900 mt-10 rounded-lg shadow-lg'>
          <div>
            {categoryData &&
              categoryData.data.map((obj)=>{
                console.log("category",obj)
                return(
              <div className='px-2 my-4 py-1 cursor-pointer' onClick={()=>{setFilter({...filter,category:obj._id})}}>{obj?.name}</div>
                )
              })
            }
          </div>
        </div>
        </div>
      </div>
   
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        heading={""}
        content={""}
        onClick={() => {
          deleteProduct(id)
            .then((res) => {
              setShowModal(false);
            })
            .catch((err) => {
              console.log(err);
              setShowModal(false);
            });
        }}
      />
       {isLoading &&  <div className="absolute left-0 top-0 w-full h-screen">
          <Loader/>
         </div>}
    </>
  );
}
