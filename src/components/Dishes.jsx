import React, { useState } from 'react'
import AddToCartBtn from './AddToCartBtn';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utlis/cartSlice';
import { setSimilarRest, toggleDiffRes, toggleSimilarRest } from '../utlis/toggleSlice';
import { Link } from 'react-router-dom';

let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

function Dishes({
    data: {
        info,
        restaurant: { info: menuData },
        hideRestaurantDetails = false,
    },
}) {


    let { imageId = "", name, defaultPrice ,price ,  isVeg ,id : itemId} = info
    let {id, name : resName , avgRating, sla: {slaString} , slugs : {city, restaurant : resLocation}} = menuData

    const {id:menuId} = useSelector((state) => state.cartSlice.menuData)


    const isDiffRest = useSelector(state => state.toggleSlice.isDiffRest)
    const dispatch = useDispatch()
  
    
    function handlePopBoxSecond(params) {
      dispatch(clearCart())
      handlePopBoxfirstButton()   
    }
    function handlePopBoxfirstButton(params) {
      dispatch(toggleDiffRes())
      
    }



    function handleSimilar(params) {
        if (menuId == id || !menuId) {
            // dispatch(toggleSimilarRest())

            dispatch(setSimilarRest({
                isSimilarResDishes : true,
                city ,
                resLocation ,
                resId : id,
                itemId
            }))
            
        }
     
     
      
    }

  return (
    <>
        {
            isDiffRest &&

            (<div className='w-[30%] h-[180px] bg-white fixed bottom-0 left-115 max-sm:left-0 max-sm:w-full z-10 border-green-800 border-2 p-4 flex flex-col gap-1 shadow-md '>
              <h1 className='font-bold text-[22px]'>Items already in cart</h1>
              <p className='font-medium text-gray-600 leading-4.5 text-[14px]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
              <div className='flex gap-1.5 justify-center mt-2'>
                <button onClick={handlePopBoxfirstButton} className='cursor-pointer py-2 px-18 border-green-800 border-2 text-green-800 font-bold hover:shadow-md hover:bg-gray-200 duration-300 max-sm:text-[13px] max-sm:px-10'>NO</button>
                <button onClick={handlePopBoxSecond} className='cursor-pointer py-2 px-4 border-green-800 border-2 bg-green-800 text-white font-bold hover:bg-gray-200 hover:text-green-800 duration-300 max-sm:text-[13px]'>YES, START AFRESH</button>
                
              </div>
            </div>)
    }
    
    <div  className=' w-[100%] bg-white rounded-3xl p-4 z-0 h-full max-sm:h-full  max-sm:w-full '>
         
                                        <div>
                                        <Link to={`/restaurantMenu/${menuData.id}`}>
                                            <div className='pb-3 border-dashed border-b-gray-300 border-b flex items-center justify-between'>
                                                <div>

                                                        <h1 className='font-bold text-gray-700 line-clamp-1'>{resName}</h1>
                                                        <div className='flex gap-1 items-center text-gray-500'>
                                                            <div className='mt-1'>
                                                            <i className=" fi fi-ss-star "></i>
                                                            </div>
                                                            <span className='text-[14px] font-medium'>{avgRating}</span>
                                                        <span className='text-[14px] font-medium'>{slaString}</span>
                                                        </div>
                                                </div>
                                                <div>
                                                    <i className="fi fi-ts-arrow-small-right text-3xl"></i>
                                                </div>
                                            </div>
                                        </Link>

                                            <div className='flex justify-between py-4  min-h-[200px]'>
                                                <div className='w-[50%] flex flex-col gap-2.5 '>
                                                    <div className='flex flex-col gap-0.5'>
                                                        
                                                        <img className='w-4' src={(isVeg ? veg : nonVeg)} alt="" />
                                                        <h1 className='font-bold text-gray-800 line-clamp-3 text-xl'>{name}</h1>
                                                        <p className='font-medium'>Rs {(defaultPrice ? defaultPrice / 100 : price / 100)}</p>
                                                        
                                                    </div>
                                                    <button className='border border-gray-300 px-2 py-1 rounded-3xl text-[12px] text-gray-600 flex w-30 justify-center'><span className='font-medium '>More Details</span> <i className=" text-[15px]  fi fi-rr-angle-small-right"></i></button>

                                                </div>
                                                <div className='w-[35%] max-sm:w-[40%] max-md:w-[40%] relative flex flex-col justify-center'>
                                                    {
                                                    imageId
                                                    ? 
                                                    <img className='rounded-xl aspect-square w-full  ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + (imageId )} alt="" />
                                                    : ""
                                                    }
                                                        {/* <button className='border-gray-300 border cursor-pointer hover:bg-gray-200 duration-200 font-extrabold text-green-800 py-2 rounded-xl absolute max-sm:bottom-[11px] bottom-[1px] left-1/2 -translate-x-1/2  bg-white shadow-md px-10 max-sm:py-1.5 max-sm:px-6 max-sm:text-[12px] max-lg:px-5' >ADD</button> */}
                                                        <div onClick={handleSimilar}>
                                                            <AddToCartBtn info={info} menuData={menuData} />

                                                        </div>
                                                </div>
                                            </div>
                                        </div>
        
    </div>
                                    </>
  )
}

export default Dishes