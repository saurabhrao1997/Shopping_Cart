import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const userApi = createApi({
    reducerPath:"userApi",

    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:4000/api/v1/"
    }),
    tagTypes: ["userApi"],
    endpoints:(builder)=>({
     getAllUser:   builder.query<any, void>({
        query:()=> ({url: "getalluser"}),
        providesTags: ["userApi"],
        extraOptions: { maxRetries: 1 },

     })
    })
})

export const {useGetAllUserQuery} = userApi
