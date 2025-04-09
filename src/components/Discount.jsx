function Discount(item) {
  
    return(
  
      <div className='flex h-auto border border-slate-400 items-center  gap-1.5 p-[13px] rounded-2xl'>
        
        <div className='w-[60px]'><img className='' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${item?.data?.info?.offerLogo}`} alt="" /></div>
        
        <div className='w-[230px] '>
          <p className='font-bold text-[18px]'>{item?.data?.info?.header}</p>
          <p className='font-semibold text-slate-500 text-[15px]'>{item?.data?.info?.couponCode} </p>
        </div>
  
        
      
      </div>
      
    )
  }

  export default Discount