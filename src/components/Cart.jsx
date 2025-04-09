import React, { useContext } from 'react'
import { CartContext } from '../context/ContextApi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeitem } from '../utlis/cartSlice'
import toast from 'react-hot-toast'
import { loginClose } from '../utlis/toggleSlice'

let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

function Cart() {

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const menuData = useSelector((state) => state.cartSlice.menuData)
    const dispatch = useDispatch()
    // console.log(cartData);
    
    

    function handleRemoveCart(i) {

        if (cartData.length > 1) {
            
            let newArr = [...cartData]
           newArr.splice(i,1)
            dispatch(removeitem(newArr))
            toast.success('Removed Successfully')
           
        }else{
            handleClearCart()
            toast.success('Clear Successfully')
        }
        
        
    }

    function handleClearCart(params) {
        dispatch(clearCart())

        
        
    }

    const userData = useSelector(state => state.authSlice.userData)

    const navigate = useNavigate()

    function handlePlaceOrder(params) {
        if (!userData) {
            toast.error("Please Sign In")
            
            dispatch(loginClose())
            return
        }

        toast.success("Placed Order")
    }

    let totalPrice = cartData.reduce((sum , item) => sum + (item.price ?? item.defaultPrice) / 100 , 0)

    

    if (cartData == 0) {
        return (

                <div className='w-full  flex justify-center items-center relative'>
                    <div className='w-[60%] max-sm:w-[80%] h-full flex flex-col justify-center items-center py-16 gap-7'>
                        <img className='w-[50%] max-sm:w-[80%]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
                        <div className='text-center'>
                            <h1 className='font-bold text-2xl'>Your cart is empty</h1>
                            <p className='font-medium text-gray-600'>You can go to home page to view more restaurants</p>
                        </div>
                       <Link to={"/"}> <button className='cursor-pointer  bg-green-500  px-6 py-1 flex items-center gap-1.5 font-medium border-2 duration-300 border-green-500 hover:bg-transparent shadow-md'>BACK TO HOME</button></Link>
                    </div>
                </div>
        )
    }
// console.log(menuData);

  return (
    <div className='w-full h-full flex justify-center'>
        <div className='w-[60%] h-full bg-white py-10 max-sm:w-[90%] max-md:w-[80%] max-lg:w-[60%]'>


        {/* <Link to={`/restaurantMenu/${menuData.id}`}>
            <div className='bg-gray-300 w-[35px] rounded-3xl flex items-center justify-center mb-5 cursor-pointer hover:bg-gray-200 duration-300'>
                <i className={`text-2xl mt-1 fi fi-rr-arrow-small-left`}></i>
            
            </div>    
        </Link>    */}
                <Link to={`/restaurantMenu/${menuData.id}`}>
                
                    <div className='rounded-xl flex gap-5'>
                        <div>
                            <img className='rounded-xl w-44 max-sm:w-30' srcSet={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + (menuData.cloudinaryImageId)} alt="" />

                        </div>
                        <div>
                            <h1 className='text-3xl font-bold underline max-sm:text-[25px]'>{menuData.name}</h1>
                            <p className='font-medium py-0.5 max-sm:text-[15px]'>{menuData.city}</p>
                            <div className='flex gap-0.5 items-center'>
                                <p className='mt-1'>
                                <i className="text-green-800 fi fi-ss-star"></i>
                                </p> 
                                <span className=' text-green-800 max-sm:text-[12px]'>({menuData.avgRating}) </span>
                               
                            </div>
                        </div>
                    </div>
                    <hr className='mt-5 text-gray-400'/>
                    </Link>
            





        {
            cartData.map(({name ,defaultPrice ,price, itemAttribute , offerTags , imageId, description, ratings : {aggregatedRating : {rating , ratingCountV2} }} , i)=>(
         <div key={i} className={' flex w-full justify-between items-center  py-10 border-b-1 border-gray-400 '}>
         
          <div className='w-[60%] flex flex-col gap-1'>
            <img className='w-4' src={(itemAttribute && itemAttribute.vegClassifier == "VEG" ? veg : nonVeg)} alt="" />
            <h1 className='font-bold text-xl text-gray-900 line-clamp-1 max-sm:text-[18px]'>{name}</h1>
            <div className='flex gap-1 items-center'>
            <h2 className='font-bold max-sm:text-[12px]'>Rs {(price ? price : defaultPrice) / 100}</h2>
            <p><i className="text-green-800 fi fi-ss-tags"></i> <span className='font-bold text-[12px] text-gray-600'>{`${offerTags?.[0]?.title ?? "" } ${offerTags?.[0]?.subTitle ?? "" }`}</span></p> 
            </div>

            {
              rating ? 
               <div className='flex gap-0.5 items-center py-1 '>
                 <p className='mt-1'>
                <i className="text-green-800 fi fi-ss-star"></i>
                </p> 
              <span className=' text-green-800 font-medium max-sm:text-[12px] '>{rating} </span>
              <span className='text-gray-600 font-medium max-sm:text-[12px]'>({ratingCountV2})</span>
              </div>
               : 
               <div className='flex gap-0.5 items-center py-1'>
              <div className='mt-1'>
                <i className="text-green-800 fi fi-ss-star"></i>
                </div> 
              <span className=' text-green-800 font-medium max-sm:text-[12px]'>0 </span>
              <span className='text-gray-600 font-medium max-sm:text-[12px]'>(0)</span>
              </div>
          
            }
              
            
            

               <p className='text-gray-600 font-medium line-clamp-2 max-sm:text-[12px]'>{description}</p>
          </div>

          <div className='w-[25%] max-sm:w-[30%] relative'>
            {
              imageId
              ? 
              <img className='rounded-xl aspect-square w-full ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + (imageId )} alt="" />
              : ""
            }
            <button onClick={handleRemoveCart}  className=' cursor-pointer hover:bg-gray-200  font-extrabold text-white py-2 rounded-xl absolute bottom-[-20px]  left-1/2 -translate-x-1/2 border-2 border-red-500 bg-red-500 hover:text-red-500 shadow-md px-10 duration-300 max-sm:py-2 max-sm:px-6 max-sm:text-[12px]' >REMOVE</button>
          </div>
          

        </div>
            ))
        }





            <h1 className='max-sm:text-[14px] py-2 max-sm:font-medium'>Total :  <span className='font-bold'>Rs {totalPrice}</span> </h1>
            <div className='flex justify-between'>
                <button onClick={handlePlaceOrder} className='cursor-pointer  bg-green-500  px-6 py-1 flex items-center gap-1.5 font-medium border-2 duration-300 border-green-500 hover:bg-transparent shadow-md'> <i className="fi fi-rr-cart-arrow-down mt-1 text-[20px]"></i> Place Order</button>
                <button  onClick={handleClearCart}  className='cursor-pointer  bg-green-500  px-6 py-1 flex items-center gap-1.5 font-medium border-2 duration-300 border-green-500 hover:bg-transparent shadow-md'> <i className="fi fi-sr-cart-minus mt-1 text-[20px]"></i> Clear Cart</button>

            </div>
            
        </div>
    </div>
  )
}

export default Cart