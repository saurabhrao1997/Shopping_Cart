

import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const orderApi = createApi({
    reducerPath:"OrderApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:4000/api/v1/order/"
    }),
    tagTypes: ["OrderApi"],
    endpoints:(builder)=>({
     createOrder:   builder.mutation<any, any>({
        query:(param)=> ({
            url:"create",
            method:"POST",
           
            body : param
        }),
        invalidatesTags: ["OrderApi"],
        extraOptions: { maxRetries: 1 },
     }),
     getOrder: builder.query<any, void>({
       query:()=>{
        return {
            url:`get`
        }
        
       },
            providesTags: ["OrderApi"],
            extraOptions: { maxRetries: 1 },
     }),
  
    //  updateCategory: builder.mutation<any, any>({
    //     query:(params)=>{
    //      return {
    //          url:"update",
    //          method:"PUT",
    //          body:params
    //      }
         
    //     },
    //          invalidatesTags: ["orderApi"],
    //          extraOptions: { maxRetries: 1 },
    //   }),
      
      deleteOrder: builder.mutation<any, any>({
        query:(id)=>{
         return {
             url:`delete?id=${id}`,
             method:"DELETE",
            //  body:params
         }
         
        },
             invalidatesTags: ["OrderApi"],
             extraOptions: { maxRetries: 1 },
      }),
    })
})

export const {useCreateOrderMutation,useDeleteOrderMutation,useGetOrderQuery} = orderApi
