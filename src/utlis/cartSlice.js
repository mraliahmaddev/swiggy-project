import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const cartSlice = createSlice({

    name : "cartSlice",
    initialState : {
        cartItems : JSON.parse(localStorage.getItem("cartData")) || [],
        menuData : JSON.parse(localStorage.getItem("menuData")) || [],
    },
    reducers : {
        addToCart : (state,action) => {
            
            const {info , menuData} = action.payload
            // console.log(info);

            state.cartItems = [...state.cartItems , info]
            state.menuData = menuData
            localStorage.setItem("cartData" , JSON.stringify(state.cartItems))
            localStorage.setItem("menuData" , JSON.stringify(menuData))

        },
        removeitem : (state,action) => {
            state.cartItems = action.payload
            localStorage.setItem("cartData" , JSON.stringify(action.payload))
        },
        clearCart : (state) => {
            state.cartItems = []
            state.menuData = []

            localStorage.removeItem("cartData" )
            localStorage.removeItem("menuData")
            toast.success('Clear Cart Successfully')
        },
    }
})

export const {addToCart,removeitem,clearCart} = cartSlice.actions
export default cartSlice.reducer