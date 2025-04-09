import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function SearchRestaurants({data}) {

    const { 
                 info : {avgRating ,cloudinaryImageId,id,name,costForTwoMessage , cuisines ,sla : {slaString}}}
        
     = data


    const menuData = useSelector((state) => state.cartSlice.menuData)
  return (

    <Link to={`/restaurantMenu/${menuData.id}`}>
    
    <div  className=' w-[100%] bg-white  p-4 max-md:p-3 max-lg:p-3  z-0 h-full max-sm:h-full  max-sm:w-full   '>
                                        <div className='flex gap-3.5 items-center'>

                                        

                                        <div className='w-[30%]'>
                                            <div className=''>
                                                 <img className='rounded-xl aspect-square w-full  ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + (cloudinaryImageId )} alt="" />
                                            </div>
                                            

                                        </div>

                                        <div className='w-[70%]'>
                                            <h1 className='font-bold text-gray-700 line-clamp-1'>{name}</h1>
                                            <div className='flex gap-1 items-center text-gray-500  '>
                                                <div className='mt-1 max-sm:mb-1'>
                                                    <i className=" fi fi-ss-star max-sm:text-[10px] "></i>
                                                </div>
                                                <span className='text-[14px] font-medium max-sm:text-[11px] max-md:text-[11px] max-lg:text-[12px]'>{avgRating}</span>
                                                <span className='text-[14px] font-medium max-sm:text-[11px] max-md:text-[11px] max-lg:text-[12px]'>{slaString} - </span>
                                                <span className='text-[14px] font-medium max-sm:text-[11px] max-md:text-[11px] max-lg:text-[12px]'>{costForTwoMessage}</span>
                                             </div>
                                             <p className='line-clamp-1 text-[14px] text-gray-700  max-sm:text-[11px] max-md:text-[11px] max-lg:text-[13px]'>{cuisines.join(" , ")}</p>

                                        </div>
                                        </div>
                                    </div>
                                    </Link>
  )
}

export default SearchRestaurants