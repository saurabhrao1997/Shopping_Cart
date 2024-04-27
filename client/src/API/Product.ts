

import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:4000/api/v1/"
    }),
    tagTypes: ["productApi"],
    endpoints:(builder)=>({
     createProduct:   builder.mutation<any, any>({
        query:(param)=> ({
            url:"createproduct",
            method:"POST",
           
            body : param
        }),
        invalidatesTags: ["productApi"],
        extraOptions: { maxRetries: 1 },
     }),
     getAllProduct: builder.query<any, any>({
       query:(param)=>{
        return {
            url:`getproduct?search=${param.search}`
        }
        
       },
            providesTags: ["productApi"],
            extraOptions: { maxRetries: 1 },
     }),
     getSingleProduct: builder.query<any, any>({
        query:(id)=>{
         return {
             url:`singleproduct?id=${id}`
         }
         
        },
             providesTags: ["productApi"],
             extraOptions: { maxRetries: 1 },
      }),
     updateProduct: builder.mutation<any, any>({
        query:(params)=>{
         return {
             url:"updateproduct",
             method:"PUT",
             body:params
         }
         
        },
             invalidatesTags: ["productApi"],
             extraOptions: { maxRetries: 1 },
      }),
      addReview: builder.mutation<any, any>({
        query:(params)=>{
         return {
             url:"review",
             method:"POST",
             body:params
         }
         
        },
             invalidatesTags: ["productApi"],
             extraOptions: { maxRetries: 1 },
      }),
      deleteProduct: builder.mutation<any, any>({
        query:(id)=>{
         return {
             url:`deleteproduct?id=${id}`,
             method:"DELETE",
            //  body:params
         }
         
        },
             invalidatesTags: ["productApi"],
             extraOptions: { maxRetries: 1 },
      }),
    })
})

export const {useCreateProductMutation,
    useGetAllProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetSingleProductQuery,
      useAddReviewMutation} = productApi
