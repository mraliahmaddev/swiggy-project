import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../utlis/cartSlice'
import { toggleDiffRes } from '../utlis/toggleSlice'

function AddToCartBtn({info , menuData}) {

const cartData = useSelector((state) => state.cartSlice.cartItems)
  const getMenuDataFromLocalStorage = useSelector((state) => state.cartSlice.menuData)

  

  const dispatch = useDispatch()

      function handleCartBtn(params) {
    
        const isAdded = cartData.find((data) => data.id === info.id)
        // console.log(cartData);
        
    
        if (!isAdded) {
          if (getMenuDataFromLocalStorage.name === menuData.name || getMenuDataFromLocalStorage.length === 0) {
            dispatch(addToCart({info,menuData}))
            toast.success('Item Added in Cart Successfully')
          }else{
            // alert("different restaurent item")
            dispatch(toggleDiffRes())
          }
          
    
        }else{
          // alert("Products already added")
          toast.error('Item Already Added in Cart')
        }
        
        

      }


      


  return (
    <button onClick={handleCartBtn}  className='border-gray-300 border cursor-pointer hover:bg-gray-200 duration-200 font-extrabold text-green-800 py-2 rounded-xl absolute bottom-[-20px] left-1/2 -translate-x-1/2  bg-white shadow-md px-10 max-sm:py-1.5 max-sm:px-6 max-sm:text-[12px] ' >ADD</button>

  )
}

export default AddToCartBtn