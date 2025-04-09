import React, { useContext, useEffect, useState } from "react";
import { data, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CartContext, Cordinates, Visiblity } from "../context/ContextApi";
import { useDispatch, useSelector } from "react-redux";
import { loginClose, toggleClose } from "../utlis/toggleSlice";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebaseAuth";
import { addUserData, removeUserData } from "../utlis/authSlice";
import SignIn from "./SignIn";
import {motion} from "framer-motion"





function Navbar() {





    const cartData = useSelector((state) => state.cartSlice.cartItems)
    // console.log(cartData);
    
    const location = useLocation()
//  Toggle with redux toolkit

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle)
  const userData = useSelector((state) => state.authSlice.userData)

  const dispatch = useDispatch()
  

  // console.log(visible);
  

 

  function handleCloseToggle(params) {
    // setVisible((prev) => !prev)
    dispatch(toggleClose())
  }


  function handleLoginToggle(params) {
    // setVisible((prev) => !prev)
    dispatch(loginClose())
  }


  const [searchResults , setSearchResults] = useState([])

  const [setAddress , setAddressData] = useState([])

 async function searchResultFun(val) {

      if (val == "") return

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`)
      const result = await res.json()
      setSearchResults(result.data );

      // console.log(result.data);
      
 }

 function saveLocationToLocalStorage(locationData) {
  localStorage.setItem("selectedLocation", JSON.stringify(locationData));  
}


function getSavedLocationFromLocalStorage() {
  const savedLocation = localStorage.getItem("selectedLocation");
  return savedLocation ? JSON.parse(savedLocation) : null; 
}


  const {setCoord} = useContext(Cordinates)

  

 async function fetchLocation(id) {

      handleCloseToggle()

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`)
      const result = await res.json()
      
      
      const locationData = {
        address: result.data[0].formatted_address,
        coordinates: {
          lat: result.data[0].geometry.location.lat,
          lng: result.data[0].geometry.location.lng,
        },
      };
  
      // Store locationData in localStorage
      saveLocationToLocalStorage(locationData);
  
      // Update context or state with coordinates
      setCoord(locationData.coordinates);
      setAddressData(locationData.address);
      
      
      
      // setCoord()
      // console.log(result.data[0].geometry.location.lat);
      // console.log(result.data[0].geometry.location.lng);
      
 }

 useEffect(() => {
  const savedLocation = getSavedLocationFromLocalStorage();
  if (savedLocation) {
    // If a location is saved in localStorage, update the state with saved data
    setCoord(savedLocation.coordinates);
    setAddressData(savedLocation.address);
  }
}, []); 

// Sign Component funcationality 





  return (
    < div className="relative w-full h-full ">

     
        
      <div className={"w-full h-full " }>


        <div onClick={handleCloseToggle} className={"w-full h-full bg-black/50 fixed top-0 left-0 z-50 " + (visible ? "visible" : "invisible")}></div>

        <div  className={"bg-white z-50 h-full max-sm:w-full max-md:w-[60%] w-[40%] duration-600 fixed p-5 " + (visible ? "left-0" : "-left-[100%]")}>
            {/* <p className="bg-black text-white w-[50px]" onClick={handleCloseToggle}>cut</p> */}
            <div className="flex justify-end w-[95%]">
                <i className=" cursor-pointer hover:text-[#FF5200] duration-300 m-4 text-[18px]  fi fi-rs-cross" onClick={handleCloseToggle}></i>

            </div>

            <div className="w-full flex justify-center ">
              <div className="w-[70%] flex flex-col gap-7 max-sm:w-full">

              <input className="font-medium border border-gray-300 p-3  focus:outline-none focus:shadow-md" type="text" onChange={(e) => searchResultFun(e.target.value)} placeholder="Search for area,street name..."/>
              {
                searchResults.length ? 
             <div className={"flex flex-col  border p-6 border-gray-300 "}>

              { 

                  searchResults.map(( {description , place_id, structured_formatting : {main_text}} , i) =>(
                   
                    
                    <div key={i}  onClick={() => fetchLocation(place_id)} className=" cursor-pointer border-dashed border-b border-gray-400 py-3 flex gap-5 items-center">
  
                      <i className="fi fi-rr-time-past text-gray-500"></i>
                      <div >
  
                        <p className="font-medium">{main_text}</p>
                        <p className="text-[13px] text-gray-500">{description}</p>
                      </div>
                      
                    </div>
                    
                    
                    
                  ))}
                  
                  </div> : ""
              }
                

            </div>
            </div>
            

         </div>
    
      </div> 

      {/* login toggle */}
      <div className={"w-full h-full " }>


        <div onClick={handleLoginToggle} className={"w-full h-full bg-black/50 fixed top-0 left-0 z-50 " + (loginVisible ? "visible" : "invisible")}></div>

        <div  className={"bg-white z-50 h-full max-sm:w-full max-md:w-[60%] w-[35%] duration-600 fixed py-10 px-8 " + (loginVisible ? "right-0" : "-right-[100%]")}>
            {/* <p className="bg-black text-white w-[50px]" onClick={handleCloseToggle}>cut</p> */}
            <div className="flex justify-start  ">
                <i className=" cursor-pointer hover:text-[#FF5200] duration-300  text-[18px]  fi fi-rs-cross" onClick={handleLoginToggle}></i>

            </div>

            

            <SignIn/>
            

         </div>
    
      </div> 

      {/* login toggle end */}
      




    

    <div className="w-full shadow-md h-[80px]  flex justify-center align-center sticky top-0 z-40 bg-white">
      <div className=" w-[80%] flex align-center justify-between max-md:w-[95%]">
        <div className=" flex items-center">
          <Link to={"/"}>
          <div className="w-18">

          <img
            className="max-w-14"
            srcSet="https://i.postimg.cc/J0B5wDYc/svgxml-base64-PHN2-Zy-B4b-Wxucz0ia-HR0c-Dov-L3d3dy53-My5vcmcv-Mj-Aw-MC9zdmci-IGNs-YXNz-PSJWWEpsai-Igdmlld0-Jve-D0i-MC.png"
            alt=""
            />
          </div>
           </Link>
          <div className="flex items-center gap-1.5 cursor-pointer group" onClick={handleCloseToggle}>
            <p className="border-b-2 font-bold duration-300 group-hover:text-[#FF5200] group-[]:">Other</p>
            <p className={"text-gray-600 hover:text-gray-400 duration-300 text-[13px] font-medium line-clamp-1  overflow-hidden " + (setAddress ? "max-w-[180px]" : " ") }>{setAddress}</p>
            <i className="mt-1.5 text-2xl text-[#FF5200] fi fi-rr-angle-small-down" ></i>
          </div>

          
        </div>
              
             
        <div className="flex items-center gap-10 max-md:gap-5">

        {/* <div className="flex gap-2 items-center cursor-pointer  group max-md:hidden">
                <i className="mt-1 text-[18px] fi fi-rr-shopping-bag hover:duration-300 group-hover:text-[#FF5200] group-[]"></i>
                <p className="font-medium hover:duration-300 group-hover:text-[#ff5200] :">Swiggy Corporate</p>
        </div> */}

      <Link to={"/search"} >
        <div className={`flex gap-2 items-center cursor-pointer group ${location.pathname === "/search" ? "activeNav" : ""}`}>
                <i className={`mt-1 text-[18px] fi fi-rs-search hover:duration-300 group-hover:text-[#FF5200] group-[] ` }></i>
                <p className={`font-medium hover:duration-300 group-hover:text-[#ff5200] max-md:hidden `}>Search</p>
        </div>
      </Link>

        {/* <div className="flex gap-2 items-center cursor-pointer group  max-md:hidden">
                <i className="mt-1 text-[18px] fi fi-rr-badge-percent hover:duration-300 group-hover:text-[#FF5200] group-[]"></i>
                <p className="font-medium hover:duration-300 group-hover:text-[#ff5200]">Offers</p>
        </div>

        <div className="flex gap-2 items-center cursor-pointer group max-md:hidden">
                <i className="mt-1 text-[18px] fi fi-rr-info hover:duration-300 group-hover:text-[#FF5200] group-[]"></i>
                <p className="font-medium hover:duration-300 group-hover:text-[#ff5200] ">Help</p>
        </div> */}

        

          <div onClick={handleLoginToggle} className="flex gap-2 items-center cursor-pointer group">
              {
                  userData ? <img className="w-[40px] max-sm:w-[25px] max-md:w-[35px] rounded-3xl" srcSet={userData.userPhoto} alt="" /> :
                  <i className="mt-1 text-[18px] fi fi-rr-user hover:duration-300 group-hover:text-[#FF5200] group-[]"></i>

              }
                <p className="font-medium hover:duration-300 group-hover:text-[#ff5200] max-md:hidden ">{userData ? userData.userName : "Sign In"}</p>
         </div>

        

        <Link to={"/cart"}>
        <div className={`flex gap-2 items-center cursor-pointer group relative  ${location.pathname === "/cart" ? "activeNav" : ""}`}>
                 <i className="mt-1 text-[18px] fi fi-rr-shopping-cart hover:duration-300 group-hover:text-[#FF5200] group-[]"></i>
                <p className="font-medium hover:duration-300 group-hover:text-[#ff5200] max-md:hidden">Cart</p>
               {
                cartData == 0 ? "" : <p className="bg-[#ff5200] w-5 h-5  flex justify-center items-center rounded-4xl text-[12px] font-bold text-white absolute bottom-6 -right-5 max-md:-right-1.5 max-md:w-3.5 max-md:h-3.5 max-md:text-[10px] max-md:bottom-7">{cartData.length}</p>

               }
        </div>
        </Link>


        </div>
        

      </div>
    </div>
       
    

    <Outlet/>
    </div>
  );
}

export default Navbar;
