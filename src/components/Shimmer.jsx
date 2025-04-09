import React from 'react'

function HomeShimmer() {
  return (
    <div className='w-full h-full '>
        <div className='h-[350px] bg-[#171A29] flex justify-center items-center'>
            <div className='flex justify-center flex-col items-center gap-8'>
                <div className='relative flex flex-col justify-center items-center'>

                    <img className='w-16 absolute' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                    <div className="loader"></div>
                </div>
                <h1 className='text-white text-xl'>Looking for great food near you ...</h1>
            </div>
            
        </div>
        <div className='flex justify-center'>
        <div className='w-[80%]  pt-5 flex gap-4 flex-wrap justify-center'>
            {
                Array(12).fill("").map((data,i) => 
                    <div key={i} className='w-[257px] h-[165px]  animate'></div>)
            }

        </div>
        </div>
        

    </div>
  )
}

export default HomeShimmer




export function ShimmerMenu() {
  return (
    <div className='w-full h-full flex flex-col items-center '>
        <div className='w-[50%] mt-4 flex flex-col gap-3 max-sm:w-[80%]'>
            <div className='py-4 animate w-[40%]'></div>
            <div className='animate h-[200px] w-full'>
               
            </div>

            <div className='flex w-full justify-between '>
                <div className='py-6 animate w-[45%]'></div>
                <div className='py-6 animate w-[45%]'></div>
                
            </div>

            <div className='flex w-full justify-between gap-5 '>
                <div className='py-6  w-[50%] flex flex-col gap-3'>
                    <div className='py-4 animate w-[40%]'></div>
                    <div className='py-4 animate w-[60%]'></div>
                    <div className='py-4 animate'></div>
                </div>
                <div className='py-6 animate w-[40%]'></div>
                
            </div>

        </div>

    </div>
  )
}



export function ShimmerDishes() {
  return (
    <div className='w-full h-full grid grid-cols-2 justify-items-center gap-3 p-4 bg-white max-sm:grid-cols-1'>
        
        {
                Array(5).fill("").map((data,i) => 
                    <div key={i} className='w-full h-[290px]  animate '></div>)
            }

      
        
    </div>
  )
}





