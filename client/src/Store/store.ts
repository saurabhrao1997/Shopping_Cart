import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";

import {userApi} from "../API/user";
import {productApi} from "../API/Product";
import WishliatSlice from "../component/Slice/WishliatSlice";
import tokenSlice from "../component/Slice/TokenSlice"
import { CategoryApi } from "../API/Category";
import { orderApi } from "../API/Order";
export const store = configureStore({
    reducer:{
   [userApi.reducerPath]:userApi.reducer,
   [productApi.reducerPath]:productApi.reducer,
   [CategoryApi.reducerPath]:CategoryApi.reducer,
   [orderApi.reducerPath]:orderApi.reducer,




  //  slice
   wishlist:WishliatSlice,
   token : tokenSlice
  
    },


      // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(productApi.middleware)
    .concat(CategoryApi.middleware)
    .concat(orderApi.middleware)
})


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

setupListeners(store.dispatch);