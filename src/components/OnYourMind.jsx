import React, { useState } from 'react'

function OnYourMind({data}) {

   
    const [value , setValue] = useState(0)

    
    function handlerPrev(params) {
        value <= 0 ? "" : setValue((preVal) => preVal - 63)
        // value setValue((preVal) => (preVal <=  0 ? preVal : preVal + 65 ))      
        
    }


    function handlerNext() {
        value >= 189 ? "" : setValue((preVal) => preVal + 63)
        // setValue((preVal) => preVal + 63)

        
        
    }
    // console.log(value)

  return (

    <div className='pt-3'>
        <div className='flex justify-between items-center'>

                <h1 className='font-bold text-2xl max-sm:text-xl'>Order our best food options</h1>

                <div  className='flex gap-2.5 items-center'>

                    <div onClick={handlerPrev} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (value <= 0 ? "bg-gray-100" :" bg-gray-300") }>
                    <i className={`text-2xl mt-1 fi fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" :" text-gray-800")}></i>
                    </div>

                    <div onClick={handlerNext} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (value >= 189 ? "bg-gray-100" :" bg-gray-300") }>
                    <i className={`text-2xl mt-1 fi fi-rr-arrow-small-right ` + (value >= 189 ? "text-gray-400" :" text-gray-800")}></i>
                    </div>   

                </div>

            </div>

            <div style={{translate : `${-value}%`}} className={`flex duration-700 py-5`}>
                {data.map((item , i) =>(
                    <img key={i} className='w-39 hover:scale-94 duration-300 max-sm:w-28' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`} alt="" />
                ))}
            </div>
        <hr className='border-gray-300'/>
    </div>

  )
}

export default OnYourMind