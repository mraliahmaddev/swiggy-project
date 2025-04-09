import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext, Cordinates } from '../context/ContextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../utlis/cartSlice';
import toast from 'react-hot-toast';
import AddToCartBtn from './AddToCartBtn';
import { toggleDiffRes } from '../utlis/toggleSlice';
import { ShimmerMenu } from './Shimmer';
import MenuCard from './MenuCard';
import Discount from './Discount';






function RestaurantMenu() {
    const {id} = useParams()
    

    let mainId = id.split("rest").at(-1)
    
    const [menuData , setMenuData] = useState([])
    const [discountData , setDiscountData] = useState([])
    const [toggleData , setToggleData] = useState([])
    const[topPicksData , setTopPicksData] = useState(null)
    const {coord : {lat , lng}} = useContext(Cordinates)

  
    
    

    async function fetchMenu(params) {

      try{
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        const result = await res.json()

        let acutalToggleData =(result?.data?.cards.find(data => data?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories);
        
        setTopPicksData((result?.data?.cards.find(data => data?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data?.card?.card?.title == "Top Picks")[0]);
        // console.log((result?.data?.cards.find(data => data?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data?.card?.card?.title == "Top Picks")[0]);

        setToggleData(acutalToggleData);
        setMenuData(result?.data?.cards.find(data => data?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")?.card?.card?.info)
        setDiscountData((result?.data?.cards.find(data => data?.card?.card?.["@type"] == "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget")?.card?.card?.gridElements?.infoWithStyle?.offers));
        
      }

      catch(error){
        console.log(error);
        
      }

    }

    useEffect(() =>{
      fetchMenu()
    },[])


    const [value , setValue] = useState(0)
    
        
        function handlerPrev(params) {
            value <= 0 ? "" : setValue((preVal) => preVal - 52)
            
        }
    
    
        function handlerNext() {
            value >= 156 ? "" : setValue((preVal) => preVal + 52)
    
            
            
        }
        


    const [topPicksvalue , setTopPicsValue] = useState(0)

    
        
        function topPickshandlerPrev(params) {
          topPicksvalue <= 0 ? "" : setTopPicsValue((preVal) => preVal - 46)
         
        }
    
    
        function topPicshandlerNext() {
          topPicksvalue >= 138 ? "" : setTopPicsValue((preVal) => preVal + 46)
         
        }
        
        
        

  return (

    <div className='w-full h-full relative '>
    {

menuData && Object.keys(menuData).length > 0  ? (

      <div className=' m-auto w-[50%] max-sm:w-[90%] max-md:w-[80%] max-lg:w-[60%] pt-2.5 overflow-hidden'>


        <p><Link to={"/"}><span className='text-slate-500 text-[12px] hover:text-slate-700'>Home /</span></Link> <span className='text-slate-500 text-[12px] cursor-pointer hover:text-slate-700'>{menuData?.city} /</span> <span className='text-[12px] text-slate-700'>{menuData?.name}</span></p>

          <h1 className='font-bold text-2xl mt-10 ml-4 max-sm:text-xl'>{menuData?.name}</h1>

        {/* Menu Details */}

        <div className='bg-gradient-to-t from-slate-200 from-10%  to-transparent to-70% w-full h-[200px] rounded-3xl p-5'>


          <div className='w-full h-full bg-white rounded-3xl p-5 flex flex-col gap-2 border border-slate-300 justify-center'>

            <div className='flex flex-col  font-bold'>
              <div className='flex gap-1 items-center font-bold'>
                <i className="fi fi-sr-circle-star text-green-800 mt-1"></i>
                <span className='max-sm:text-[13px] font-bold'>{menuData?.avgRating}</span>
                <span className='max-sm:text-[12px] font-bold'>{`(${menuData?.totalRatingsString})`} - </span>
                <span className='max-sm:text-[12px] font-bold'>{menuData?.costForTwoMessage}</span>

              </div>
            <p className='text-orange-400 font-bold text-[14px] underline max-sm:text-[13px]'>{menuData?.cuisines?.join(", ")}</p>

            </div>
            <div className='flex gap-2'>
              <div className='w-[7px] flex flex-col justify-center '>
                <div className='w-[7px] h-[8px] bg-slate-400 rounded-4xl'></div>
                <div className='w-[1px] h-full  bg-slate-400 m-auto'></div>
                <div className='w-[7px] h-[8px] bg-slate-400 rounded-4xl'></div>
              </div>

              <div className='text-[13px]'>
                <p className='font-bold max-sm:text-[13px]'>Outlet <span className='font-medium text-slate-500 text-[12px]'>{menuData?.areaName}</span> </p>
                <p className='font-bold text-transform: lowercase; max-sm:text-[12px]'>{menuData?.sla?.slaString} </p>
              </div>
            </div>
          </div>



          <div>

          </div>
        </div>

        {/* Menu details End */}


        {/* Deals Section Start */}

        <div className='pt-2 flex flex-col gap-4'>
        <div className='flex justify-between items-center '>

                <h1 className='font-bold text-2xl max-sm:text-[20px]'>Deals for you</h1>

                <div  className='flex gap-2.5 items-center'>

                    <div onClick={handlerPrev} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (value <= 0 ? "bg-gray-100" :" bg-gray-300") }>
                    <i className={`text-2xl mt-1 fi fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" :" text-gray-800")}></i>
                    </div>

                    <div onClick={handlerNext} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (value >= 156 ? "bg-gray-100" :" bg-gray-300") }>
                    <i className={`text-2xl mt-1 fi fi-rr-arrow-small-right ` + (value >= 156 ? "text-gray-400" :" text-gray-800")}></i>
                    </div>   

                </div>

            </div>

            <div style={{translate : `${-value}%`}} className={`flex duration-700 w-full py-8  gap-6`}>
               {discountData.map((item , i) =>(
                
                <Discount data={item} key={i}/>
                
               ))}
               

            </div>

            
      
    </div>

        {/* Deals Section End */}

        <h1 className='text-center py-4 font-bold text-slate-600'>MENU</h1>

        <div className='relative cursor-pointer'>
          <p className='font-bold text-slate-800 text-center bg-slate-300 py-4 rounded-2xl relative'>Search for dishes</p>
          <i className=" mt-1 text-[18px] fi fi-rs-search font-bold absolute top-3 right-3 text-slate-700 "></i>

        </div>



        {/* Top Picks */}
      
      {(topPicksData &&


        <div className='pt-6 flex flex-col gap-4'>
        <div className='flex justify-between items-center '>

                <h1 className='font-bold text-2xl'>{topPicksData?.card?.card?.title}</h1>

                <div  className='flex gap-2.5 items-center'>

                    <div onClick={topPickshandlerPrev} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (topPicksvalue <= 0 ? "bg-gray-100" :" bg-gray-300") }>
                    <i className={`text-2xl mt-1 fi fi-rr-arrow-small-left ` + (topPicksvalue <= 0 ? "text-gray-400" :" text-gray-800")}></i>
                    </div>

                    <div onClick={topPicshandlerNext} className={` rounded-full w-9 h-9 flex justify-center items-center cursor-pointer ` + (topPicksvalue >= 138 ? "bg-gray-100" :" bg-gray-300") }>
                    <i className={`text-2xl mt-1 fi fi-rr-arrow-small-right ` + (topPicksvalue >= 138 ? "text-gray-400" :" text-gray-800")}></i>
                    </div>   

                </div>

            </div>
            

            <div style={{translate : `${-topPicksvalue}%`}} className={`flex duration-700 w-full py-4  gap-6`}>
               {topPicksData?.card?.card?.carousel?.map(({creativeId , dish : {info : { defaultPrice , price}}} , i) =>(

                <div key={i} className='min-w-[300px] relative flex flex-col items-center'>
                  <img className='w-full h-full' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + creativeId} alt="" />

                  <div className='flex justify-between absolute bottom-2.5 w-[90%] items-center'>
                    <p className='text-white font-medium'> Rs {(defaultPrice ? defaultPrice / 100 : price / 100)}</p>
                    
                    <button className='border-gray-300 border cursor-pointer hover:bg-gray-200 duration-200 font-extrabold text-green-800 py-2 rounded-xl bg-white shadow-md px-10 '>ADD</button>
                  </div>
                </div>
                

                
               ))}
               

            </div>

            
      
    </div>
      )}



        {/* EndTop Picks */}

        <div className=''>

          {toggleData.map(({card : {card}} ,i)=> (

            
                <MenuCard card={card} key={i} menuData={menuData}/>   

          ))}
        </div>

      </div>) :<ShimmerMenu/>
       
    }

      
    </div>
  )
}





export default RestaurantMenu