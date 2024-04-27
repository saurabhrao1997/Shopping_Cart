import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    items:[],

    tax:0,
    shippingCharge:0,
    totalPrices:0
}

const CalculateProductSummary = (state)=>{
    if(state.items.length > 0 ){
        state.tax =   state.items.reduce((acc,cur)=>{
           console.log("reduce",typeof acc, typeof cur.Price, acc,cur?.Price.replace(/,/g, ''),acc)
            return   acc + (Number(cur.Price.replace(/,/g, '') *  0.15))
        },0)


        state.shippingCharge =   state.items.reduce((acc,cur)=>{
            // console.log("reduce",typeof acc, typeof cur.Price, acc,cur?.Price.replace(/,/g, ''))
             return   acc + Number(cur.Price.replace(/,/g, '') )
         },0) > 500 ? 0 : 100
       
         state.totalPrices = 
     state.items.reduce((acc,cur)=>{
        // console.log("reduce",typeof acc, typeof cur.Price, acc,cur?.Price.replace(/,/g, ''))
         return   acc + Number(cur.Price.replace(/,/g, ''))
     },0)
        
// state.tax =  actions.payload.Price * 0.15
// state.shippingCharge =   actions.payload.Price  > 500 ? 0 : 100;

    }

}

export const wishListSlice = createSlice({
    initialState:initialState,
    name:"wishlist",
    reducers:{
        addWishlist :(state,actions)=>{
            state.items.push(actions.payload)
        console.log("inside",actions.payload)
        
        CalculateProductSummary(state)
            
             


        },
        removeWishlist:(state,actions)=>{
          let index =   state.items.findIndex((obj)=> obj?._id == actions.payload._id ) 
             state.items.splice(index,1)
             CalculateProductSummary(state)
        }
      
    }

})

export const { addWishlist,removeWishlist} = wishListSlice.actions;

export default wishListSlice.reducer