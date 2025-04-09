import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterVal } from '../utlis/filterSlice'
import Dishes from './Dishes';
import SearchRestaurants from './SearchRestaurants';
import { Cordinates } from '../context/ContextApi';
import { resetSimilarResDish, toggleSimilarRest } from '../utlis/toggleSlice';
import { ShimmerDishes } from './Shimmer';


let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

function Search() {

    const [searchQuery,setSearchQuery] = useState("")


    const [restaurantsData,setRestaurantsData] = useState([])
    const [dishes,setDishes] = useState([])

    const {coord : {lat , lng}} = useContext(Cordinates)

    const [loading,setLoading] = useState(false)

    async function fetchDishesData(params) {

        try{

            // let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=fc751d9d-7b1c-7025-153b-95ea3ed81ce0&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FPizza.png%22%2C%22dishFamilyId%22%3A%22846647%22%2C%22dishFamilyIds%22%3A%5B%22846647%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`)
            let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=29c6d8aa-a0f9-b475-bac0-8079561d01b2&submitAction=ENTER&queryUniqueId=0273304d-8632-1267-1a2e-dc4b88a9c74e`)
            let res = await data.json();
            
    
            let finalData = ((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data) => data?.card?.card?.info));
    
            // setSearchQuery(finalData);
            // console.log((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data) => data?.card?.card?.info));
            
            setDishes(finalData)
            setLoading(false)
        }catch(error){
            console.log(console.error)
            
        }
    }

    async function fetchRestaurantsData(params) {
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=fc751d9d-7b1c-7025-153b-95ea3ed81ce0&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FPizza.png%22%2C%22dishFamilyId%22%3A%22846647%22%2C%22dishFamilyIds%22%3A%5B%22846647%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D&selectedPLTab=RESTAURANT`)
        let res = await data.json();

        // const finalData = ((res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info))
            // setSearchQuery(finalData);
            // console.log((res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info));
            setRestaurantsData((res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info));
            
        
    }
    useEffect(()=> {
        if (searchQuery === "") {
            return
        }
        // setSearchQuery("")
    fetchDishesData()
    fetchRestaurantsData()
},[searchQuery])




const [selectedDish , setSelectedDish] = useState(null)
const [similarDishes , setSimilarDishes] = useState([])

const isSimilarRestData = useSelector(state => state.toggleSlice.isSimilarRestData)

    const {city, resId, resLocation, itemId} = isSimilarRestData
    

const dispatch = useDispatch()




    async function fetchSimilarRestData(params) {

        let pathName = `/city/${city}/${resLocation}`
        let encodedPath = encodeURIComponent(pathName)

        
        
        
        
            // let data = await fetch(`https://www.swiggy.com/dapi/restaurants/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
            let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)

            // let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=19.0759837&lng=72.8776559&str=pizza&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=%2Fcity%2Fmumbai%2F1441-pizzeria-chembur-rest598629%3Fquery%3Dpizza&restaurantIdOfAddedItem=598629&itemAdded=99755663`)
            let res = await data.json();
    
            setSelectedDish(res?.data?.cards[1])
            setSimilarDishes(res?.data?.cards[2]?.card?.card?.cards)
            // console.log
            // (res?.data?.cards[1])
            // console.log
            // (res?.data?.cards[2]?.card?.card?.cards)
        



        // dispatch(resetSimilarResDish())
    }

useEffect(()=> {
    if (isSimilarRestData) {
        fetchSimilarRestData()
        
        // setSearchQuery("")
    }

},[isSimilarRestData])

// useEffect(() => {
//   fetchSimilarRestData()
// }, [])




// // let searchInput = ""
// function handleSearchBtn(e) {
//     let val = String(e.target.value).trim()
    
    
//     if (e.key == "Enter" ) {
//         setSearchQuery(val)
//         setSelectedDish(null)
//         setDishes([])
//         // setSearchQuery("")
        
        
//     }
    
// }


function handleSearchlive(e) {
    setTimeout(() => {
        setSearchQuery((e.target.value).trim())
            
            setSelectedDish(null)
            setDishes([])
            setLoading(true)
            // setSearchQuery("")
        
    }, 2000);
    
}



         const filterOptions = [
                {
                filterName : "Restaurants"
                },
                {
                filterName : "Dishes"
                },

                
            ]
        
            const [activeBtn , setActiveBtn] = useState("Dishes")

            function handleFilterBtn(filterName) {
                
                setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
            }
           
            // console.log(selectedDish);
            

  return (
    <div className='w-full h-full flex justify-center max-sm:w-full'> 

    

        <div className='w-[65%] max-sm:w-[90%] max-md:w-[90%] max-lg:w-[70%] min-h-full  bg-gray-100 relative flex flex-col items-center '> 
            <div className='flex flex-col gap-4 bg-white py-5 sticky w-full top-20 z-15 max-sm:w-full'>
                <div className='relative'>
                    <input className='w-full outline-none border py-3 px-3 border-gray-400 font-bold' type="text" placeholder='Search for restauranrs and food'  onChange={handleSearchlive}/>
                    <i  className=" absolute right-5 top-3.5 cursor-pointer  fi fi-rs-search"></i>
                    
                </div>
                <div className='flex gap-1.5 flex-wrap'>
                { !selectedDish && 
                   ( filterOptions.map((data , i) => (

                        <button key={i} onClick={()=> handleFilterBtn(data.filterName)} className={'filterClass flex gap-2 items-center ' + (activeBtn === data.filterName ? "active" : "")}> 
                        <p className='font-semibold text-[14px]'>{data.filterName}</p> 
                        

                        </button>
                    )))
                }
            </div>
            </div>
            
            {
                loading ? <ShimmerDishes/> :
            <div className='w-full'>
                
            
            {
                selectedDish ? 
                <div className='flex flex-col w-full p-5 gap-2 max-sm:w-full'>
                    <p className='font-bold'>Item added to cart</p>
                    <div className='flex w-[50%] max-sm:w-full max-md:w-full max-lg:w-full'>
                        <Dishes data={selectedDish.card.card}></Dishes>

                    </div>
                    <p className='font-medium text-xl py-2'>More dishes from this restaurant</p>
                    <div className='grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 max-lg:grid-cols-1 gap-4'>

                    {
                        similarDishes.map((data , i) => <Dishes key={i} data={{
                            ...data.card,
                            restaurant : selectedDish.card.card.restaurant,
                        }}/> )
                    }
                        
                    </div>
                </div>
                :
              
                (activeBtn === "Dishes" ? (
                    <div className={`w-full h-full grid max-sm:grid-cols-1 grid-cols-2 gap-2.5 max-sm:gap-3.5 justify-center items-center  ` + (dishes.length ? "p-3" : "p-0")}>
                        
                        { 
                            dishes.map((data ,i) =>
                            
                                
                                <Dishes data={data.card.card} key={i} /> 
                            
                        )
                        }
                    </div>
                ) : (
                    <div className={`w-full h-full grid max-sm:grid-cols-1 grid-cols-2 gap-2.5 max-sm:gap-3.5 justify-center items-center  ` + (restaurantsData.length ? "p-3" : "p-0")}>
                        {
                            restaurantsData.map((data ,i) => 
                              
                                 <SearchRestaurants data={data.card.card} key={i}/> 
                        )
                        }
                    </div>
                ))
            }
            </div>
            }
        </div>
    
    </div>
  )
}

export default Search