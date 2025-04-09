import React, {  useState } from 'react'
import RestaurantCard from './RestaurantCard'
import OnlineFoodDelivery from './OnlineFoodDelivery'

function TopResturant({data , title}) {
    // console.log(data)


     const [value , setValue] = useState(0)
    
    
        function handlerPrev(params) {
            value <= 0 ? "" : setValue((preVal) => preVal - 95)
                  
            
        }
        function handlerNext() {
            value >= 380 ? "" : setValue((preVal) => preVal + 95)

            // setValue((preVal) => preVal + 95) 
            
        }
        // console.log(value);
        



  return (
    <div className='pt-4'>
        <div className='flex justify-between items-center'>
            <h1 className='font-bold text-2xl max-sm:text-xl'>{title}</h1>

            <div  className='flex gap-2.5 items-center'>
                <div onClick={handlerPrev} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (value <= 0 ? "bg-gray-100" :" bg-gray-300") }>
                <i className={`text-2xl mt-1 fi fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" :" text-gray-800")}></i>
                </div>

                <div onClick={handlerNext} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (value >= 380 ? "bg-gray-100" :" bg-gray-300") }>
                <i className={`text-2xl mt-1 fi fi-rr-arrow-small-right ` + (value >= 380 ? "text-gray-400" :" text-gray-800")}></i>
                </div>

                

            </div>

        </div>
        <div style={{translate : `${-value}%`}} className='flex gap-4 mt-4 duration-1000'>
            {data.map((item , i) => (
                <div key={i} className='flex gap-2 flex-col hover:scale-95 duration-300'>

                    <RestaurantCard {...item}/>
                    
                </div>

            ))}

            
        </div>
    <hr className='border-gray-300 mt-4'/>
</div>
  )
}

export default TopResturant;