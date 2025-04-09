import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utlis/authSlice'
import { useNavigate } from 'react-router-dom'
import { loginClose } from '../utlis/toggleSlice'

function SignIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector(state => state.authSlice.userData)

async function handleAuth(params) {

    let data = await signInWithPopup(auth,provider)
    console.log(data);

    const userData = {
        userName : data.user.displayName,
        userPhoto : data.user.photoURL
    }
    
    dispatch(addUserData(userData))
    dispatch(loginClose())
    navigate("/")
}

async function handleLogout(params) {
    await signOut(auth)
    dispatch(removeUserData())
    dispatch(loginClose())
    navigate("/")
}

  return (
    <div>
       
       <div className="w-[80%] max-md:w-full max-sm:w-full flex flex-col gap-7">

<div className="flex items-center justify-between">

    
    <div>
      {
        userData ? <h1 className="font-bold text-3xl  border-b-2 pb-3">Sign Out</h1> : <h1 className="font-bold text-3xl  border-b-2 pb-3">Sign In</h1>
      }
    


    </div>

    <div>
      <img className="w-25" srcSet="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
    </div>

</div>




    <div>

    {
        userData ?
        <button onClick={handleLogout} className='cursor-pointer bg-[#FF5200] w-full h-12 text-white font-medium flex items-center justify-center gap-2 hover: border-3 hover:text-black border-[#FF5200] hover:bg-gray-100 duration-300'> <img className="w-[32px] rounded-3xl border-2 border-white" srcSet={userData.userPhoto} alt="" /> Sign out from Google</button>
        :
        <button onClick={handleAuth} className='cursor-pointer bg-[#FF5200] w-full h-12 text-white font-medium flex items-center justify-center gap-2 hover: border-3 hover:text-black border-[#FF5200] hover:bg-gray-100 duration-300'><i className=" mt-1 text-[24px] fi fi-brands-google"></i>   Sign in with Google</button>
    }
    <p className="mt-1 text-[12px] font-medium text-gray-700">By clicking on Login, I accept the <strong className="text-black">Terms & Conditions & Privacy Policy</strong></p>
    </div>

</div>
        
    </div>
  )
}

export default SignIn