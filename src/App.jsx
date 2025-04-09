import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartContext, Cordinates, Visiblity } from './context/ContextApi'
import { useSelector } from 'react-redux'
import SignIn from './components/SignIn'


const Search = lazy(()=> import('./components/Search'))
const Cart = lazy(()=> import('./components/Cart'))
const Body = lazy(()=> import('./components/Body'))
const Navbar = lazy(()=> import('./components/Navbar'))
const RestaurantMenu = lazy(()=> import('./components/RestaurantMenu'))






function App() {

 
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)

  


  const [coord , setCoord] = useState({lat : 18.9690247 , lng : 72.8205292 })



  return (
    
    <Cordinates.Provider value={{coord , setCoord}}>
          <div className={(visible ? "max-h-screen " : " ")}>

          <Suspense>
            <Routes>
                <Route path='/' element={<Navbar/>}>
                  <Route path='/' element={<Body/>}/>
                  <Route path='/restaurantMenu/:id' element={<RestaurantMenu/>}/>
                  <Route path='/cart' element={<Cart/>}/>
                  <Route path='/search' element={ <Search/>}/>

                </Route>
            </Routes>
          </Suspense>
          </div>
          
        </Cordinates.Provider>
   
  )
}

export default App