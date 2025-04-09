import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../utlis/cartSlice"
import { toggleDiffRes } from "../utlis/toggleSlice"
import AddToCartBtn from "./AddToCartBtn"

let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

function DetailMenu({info , menuData}) {
  
    const {name ,defaultPrice ,price, itemAttribute :{vegClassifier} , offerTags , imageId, description, ratings : {aggregatedRating : {rating , ratingCountV2} }} = info 
    
  
  
    const isDiffRest = useSelector(state => state.toggleSlice.isDiffRest)
    
    
    const dispatch = useDispatch()
  
  
    function handlePopBoxSecond(params) {
      dispatch(clearCart())
      handlePopBoxfirstButton()    
    }
    function handlePopBoxfirstButton(params) {
      dispatch(toggleDiffRes())
      
    }
  
    
    
  
    return(
      <div className='my-4 relative'>
  
  
      {
        
          
          <div className={' flex w-full justify-between items-center  py-10 border-b-1 border-gray-400 '}>
           
            <div className='w-[60%] flex flex-col gap-1'>
              <img className='w-4' src={(vegClassifier == "VEG" ? veg : nonVeg)} alt="" />
              <h1 className='font-bold max-sm:text-[17px] text-xl text-gray-900 line-clamp-1'>{name}</h1>
              <div className='flex gap-1 items-center'>
              <h2 className='font-bold max-sm:text-[12px]'>Rs {(price ? price : defaultPrice) / 100}</h2>
              <p><i className="text-green-800 fi fi-ss-tags"></i> <span className='font-bold text-[12px] text-gray-600'>{`${offerTags?.[0]?.title ?? "" } ${offerTags?.[0]?.subTitle ?? "" }`}</span></p> 
              </div>
  
              {
                rating ?
                 <div className='flex gap-0.5 items-center py-1'>
                   <p>
                  <i className="text-green-800 fi fi-ss-star"></i>
                  </p> 
                <span className=' text-green-800 font-medium max-sm:text-[12px]'>{rating} </span>
                <span className='text-gray-600 font-medium max-sm:text-[12px]'>({ratingCountV2})</span>
                </div>
                 : 
                 <div className='flex gap-0.5 items-center py-1'>
                <div>
                  <i className="text-green-800 fi fi-ss-star"></i>
                  </div> 
                <span className=' text-green-800 font-medium max-sm:text-[12px]'>0 </span>
                <span className='text-gray-600 font-medium max-sm:text-[12px]'>(0)</span>
                </div>
            
              }
                
              
              
  
                 <p className='text-gray-600 font-medium line-clamp-2 max-sm:text-[12px]'>{description}</p>
            </div>
  
            <div className='w-[25%] max-sm:w-[30%] relative'>
              {
                imageId
                ? 
                <img className='rounded-xl aspect-square w-full ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + (imageId )} alt="" />
                : ""
              }
              <AddToCartBtn info={info} menuData={menuData} />
            </div>
            
  
          </div>    
        
      }
      {
              isDiffRest &&
  
              (<div className='w-[40%] h-[180px] bg-white fixed  left-1/2 bottom-1 -translate-x-1/2 z-10 border-green-800 border-3 p-4 flex flex-col gap-1  max-sm:left-1/2  max-sm:w-full max-lg:w-[50%]  max-lg:-translate-x-1/2 max-lg:left-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[60%]'>
                <h1 className='font-bold text-[22px]'>Items already in cart</h1>
                <p className='font-medium text-gray-600 leading-4.5 text-[14px]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                <div className='flex gap-1.5 justify-center mt-2'>
                  <button onClick={handlePopBoxfirstButton} className='cursor-pointer py-2 px-18 border-green-800 border-2 max-sm:text-[13px] text-green-800 font-bold hover:shadow-md hover:bg-gray-200 duration-300'>NO</button>
                  <button onClick={handlePopBoxSecond} className='cursor-pointer py-2 px-4 border-green-800 border-2 max-sm:text-[12px] bg-green-800 text-white font-bold hover:bg-gray-200 hover:text-green-800 duration-300'>YES, START AFRESH</button>
                  
                </div>
              </div>)
      }
  
      
      
      </div>
      
    
  
    )
  }
  
  export default DetailMenu