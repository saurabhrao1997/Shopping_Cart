

import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const CategoryApi = createApi({
    reducerPath:"categoryApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:4000/api/v1/category/"
    }),
    tagTypes: ["categoryApi"],
    endpoints:(builder)=>({
     createCategory:   builder.mutation<any, any>({
        query:(param)=> ({
            url:"create",
            method:"POST",
           
            body : param
        }),
        invalidatesTags: ["categoryApi"],
        extraOptions: { maxRetries: 1 },
     }),
     getCategory: builder.query<any, void>({
       query:()=>{
        return {
            url:`get`
        }
        
       },
            providesTags: ["categoryApi"],
            extraOptions: { maxRetries: 1 },
     }),
  
     updateCategory: builder.mutation<any, any>({
        query:(params)=>{
         return {
             url:"update",
             method:"PUT",
             body:params
         }
         
        },
             invalidatesTags: ["categoryApi"],
             extraOptions: { maxRetries: 1 },
      }),
      
      deleteCategory: builder.mutation<any, any>({
        query:(id)=>{
         return {
             url:`delete?id=${id}`,
             method:"DELETE",
            //  body:params
         }
         
        },
             invalidatesTags: ["categoryApi"],
             extraOptions: { maxRetries: 1 },
      }),
    })
})

export const {useCreateCategoryMutation,useDeleteCategoryMutation,useGetCategoryQuery,useUpdateCategoryMutation} = CategoryApi
