import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard(item) {
  // console.log(item.cta.link.split("/"));
  // console.log(item);
  
  
  return (
    <Link to={`/restaurantMenu/${item.cta.link.split("/").at(-1)}`} className='w-full'>
        <div  className=' relative w-[257px] h-[165px] max-sm:w-[180px] max-sm:h-[180px] max-md:w-[180px] max-md:h-[180px] max-lg:w-[195px] max-lg:h-[155px]'>
                        <img className='w-full h-full rounded-2xl object-cover ' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.info.cloudinaryImageId}`} alt="" />
                        <div className='top-0 absolute rounded-2xl bg-gradient-to-t from-black from-10% via-transparent via-50%  w-full h-full'></div>
                        <p className='absolute bottom-0 text-white font-bold ml-2 mb-2 text-2xl max-md:text-[20px]'>{item?.info?.aggregatedDiscountInfoV3 ? item?.info?.aggregatedDiscountInfoV3?.header + " " + item?.info?.aggregatedDiscountInfoV3?.subHeader : ""}</p>
                    </div>

                    <div className='pl-1 pt-1 w-full'>
                        <p className='font-medium line-clamp-1'>{item?.info?.name}</p>
                        <p className='flex gap-1 text-[14px] font-medium'> <i className="fi fi-sr-circle-star text-green-800 mt-0.5"></i> {item?.info?.avgRating} , <span>{item?.info?.sla?.slaString}</span></p>
                        <p className='text-gray-700 text-[14px] line-clamp-1'>{item?.info?.cuisines.join(" , ")}</p>
                        <p className='text-gray-700 text-[14px]'>{item?.info?.locality}</p>
         </div>

    </Link>
  )
}

export default RestaurantCard