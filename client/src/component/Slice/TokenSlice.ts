

import { createSlice } from "@reduxjs/toolkit";





export const tokenSlice = createSlice({
    initialState:localStorage.getItem("token") || "",
    name:"token",
    reducers:{
        addToken :(state,actions)=>{return state = actions.payload},
        removeToken:(state)=>{return state = ""}
    }

})

export const { addToken,removeToken} = tokenSlice.actions;

export default tokenSlice.reducer