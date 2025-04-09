import React, { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { useDispatch } from 'react-redux'
import { setFilterVal } from '../utlis/filterSlice'

function OnlineFoodDelivery({data , title}) {
    // console.log(data);

    const filterOptions = [
        {
        filterName : "Rating 4.0+"
        },
        {
        filterName : "Rs. 300-Rs. 600"
        },
        {
        filterName : "Offers"
        },
        {
        filterName : "Less than Rs. 300"
        },
    
        
    ]

    const [activeBtn , setActiveBtn] = useState(null)

    const dispatch = useDispatch()

    function handleFilterBtn(filterName) {
        
        setActiveBtn(activeBtn === filterName ? null : filterName)
    }
    useEffect(()=>{
        
        dispatch(setFilterVal(activeBtn))
},[handleFilterBtn])
    
  return (
    <div className='mt-4 '>
        <div className='flex flex-col gap-3'>
            <h1 className='font-bold text-2xl'>{title}</h1>
            <div className='flex gap-1.5 flex-wrap '>
                {
                    filterOptions.map((data , i) => (

                        <button key={i} onClick={()=> handleFilterBtn(data.filterName)} className={'filterClass flex gap-2 items-center cursor-pointer ' + (activeBtn === data.filterName ? "active" : "")}> 
                        <p className='font-semibold text-[14px]'>{data.filterName}</p> 
                        <i className='fi fi-br-cross text-[11px] mt-1 hidden'></i>

                        </button>
                    ))
                }
            </div>
        </div>
    
        <div  className='grid grid-cols-4 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-3  gap-4 mt-6 duration-1000 '>
            
            {data.map((item , i) => (
                <div key={i} className='flex flex-wrap gap-4 w-[100%]  hover:scale-95 duration-300 justify-center'>
                    
                    <RestaurantCard {...item} />
                    
                </div>

            ))}

            
        </div>
        </div>
    
  )
}

export default OnlineFoodDelivery