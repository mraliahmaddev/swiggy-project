import React, { useContext, useEffect, useState } from 'react'
import OnYourMind from './OnYourMind'
import TopResturant from './TopResturant'
import OnlineFoodDelivery from './OnlineFoodDelivery'
import RestaurantMenu from './RestaurantMenu'
import { Cordinates } from '../context/ContextApi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeShimmer from './Shimmer'

function Body() {

  const [onYouMind , setOnYourMind] = useState([])
  const [restaurantData , setRestaurantData] = useState([])
  const {coord : {lat , lng}} = useContext(Cordinates)

  const[data , setData] = useState({})
  

  const[topRestTitle , setTopRestTitle] = useState("")
  const[onlineFoodTitle , setOnlineFoodTitle] = useState("")


          async function fetchData(params) {

            try{

              const data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
              const result = await data.json()

              setTopRestTitle(result?.data?.cards[1]?.card?.card?.header?.title)
              setOnlineFoodTitle(result?.data?.cards[2]?.card?.card?.title)

              // setRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.slice(1));

              let mainData = result?.data?.cards.find(
                (data) => data?.card?.card?.id == "restaurant_grid_listing_v2"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          //   console.log(result?.data?.cards.find(
          //     (data) => data?.card?.card?.id == "top_brands_for_you"
          // )?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            
    
            let mainData2 = result?.data?.cards.find(
                (data) => data?.card?.card?.id == "restaurant_grid_listing"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            // console.log(mainData)
            setRestaurantData(mainData || mainData2)

            // console.log(result?.data);
            


            let data2 = result?.data?.cards.find(
              (data) => data?.card?.card?.id == "whats_on_your_mind").card?.card?.imageGridCards?.info;

              // setOnYourMind(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
              setOnYourMind(data2)
              setData(result.data);
              
            }
            catch(error){
              console.log(error)
            }
                
              
          } 
      
          useEffect(()=> {
              fetchData()
          },[lat , lng])

          // console.log(
          //   data.communication
          // );
          

          // if (data.communication) {
          //   return(
          //         <div className='w-full flex justify-center items-center flex-col h-screen'>
          //           <h1 className='font-extrabold text-3xl'>We're not there yet!</h1>
          //           <p className='text-gray-500 text-[17px] font-medium'>Sorry, our services are currently anavailable at this location.</p>
          //           <p className='text-gray-500 text-[17px] font-medium'>We hope to serve you in the future.</p>
          //         </div>
          //   )
            
          // }

          const filterVal = useSelector(state => state.filterSlice.filterVal)


          

          const filteredData = (restaurantData || []).filter(item => {    
            // console.log(item)
            if (!filterVal) return true;
          
            switch (filterVal) {
              case "Rating 4.0+":
                return item?.info?.avgRating > 4;
              
              case "Rs. 300-Rs. 600":
                const cost = parseInt(item?.info?.costForTwo?.replace(/[^0-9]/g, ""), 10);
                return cost >= 300 && cost <= 600;
          
              case "Less than Rs. 300":
                const costBelow = parseInt(item?.info?.costForTwo?.replace(/[^0-9]/g, ""), 10);
                return costBelow < 300;
          
              case "Offers":
                const discountInfo = item?.info?.aggregatedDiscountInfoV3;
                return discountInfo?.discountTag || discountInfo?.header || discountInfo?.subHeader ? true : false;
          
              default:
                return true;
            }
          });

          if (!restaurantData) {
            return <div className='w-full  flex justify-center items-center relative'>
                      <div className='w-[60%] max-sm:w-[80%] h-full flex flex-col justify-center items-center py-16 gap-7'>
                          <img className='w-[40%] max-sm:w-[70%]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
                          <div className='text-center flex flex-col gap-1 w-[50%] max-sm:w-[90%]'>
                              <h1 className='font-bold text-2xl'>Location Unserviceable</h1>
                              <p className='font-medium text-gray-600 '>the service is not available in your location, or that the platform is only available in select cities</p>
                          </div>
                        <Link to={"/"}> <button className='cursor-pointer  bg-green-500  px-6 py-1 flex items-center gap-1.5 font-medium border-2 duration-300 border-green-500 hover:bg-transparent shadow-md'>BACK TO HOME</button></Link>
                      </div>
                 </div>
          }
          
          

  return (
    <div className='w-full flex justify-center  '>
      {
        restaurantData.length ? 
        
        (
        <div className='w-[80%] m-auto overflow-hidden mob:w-[95%] max-md:w-[95%]'>

        {onYouMind.length ? (
                        <>
                            <OnYourMind data={onYouMind} />
                            <TopResturant data={restaurantData} title={topRestTitle}/>   
                            
                        </>
                    ) : (
                        ""
                    )}

        {/* <OnYourMind data={onYouMind}/>       
        <TopResturant data={restaurantData} title={topRestTitle}/>   */}
        <OnlineFoodDelivery data={ filterVal ? filteredData : restaurantData} title={onlineFoodTitle}/> 
        

        </div>

        ) : <HomeShimmer/>
      }
                
        
    </div>
  )
}

export default Body