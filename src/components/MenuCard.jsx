import { useState } from "react"
import DetailMenuProvide from "./DetailMenuProvider"

function MenuCard({card , menuData}) {
  
  // console.log(menuData);
  
  let showData = false

  if (card["@type"]) {
    showData = true
  }

  const [isOpen , setIsOpen] = useState(showData)

  function toggleDropDown(params) {
    setIsOpen((prev) => !prev)
    
  }

  if (card.itemCards) {

    const {title , itemCards} = card
    return(
      <>
      
      <div className='mt-4'>
          <div className='flex justify-between cursor-pointer' >
  
            <h1 className={'font-bold max-sm:text-[17px] text-' + (card["@type"] ? "2xl" : "1xl")}>{title} ({itemCards?.length})</h1>
            <i className={"mt-1.5 text-2xl text-[#292929] fi fi-rr-angle-small-" + (isOpen ? "up" : "down")} onClick={toggleDropDown}></i>
            
          </div>
          {
            isOpen && <DetailMenuProvide itemCards={itemCards} menuData={menuData}/>
          }
          
          
      </div>
      <hr className={"my-2 border-slate-200 rounded-md border-" + (card["@type"] ? "[10px]" : "[4px]")}/>
      </>
    )
  }else{
    const {title , categories} = card
    return(
      <div>
        <div className='flex justify-between mt-4'>
          <h1 className='font-bold text-xl max-sm:text-[16px]'>{title} ({categories.length})</h1>
          {/* <i className="mt-1.5 text-2xl text-[#292929] fi fi-rr-angle-small-up" onClick={toggleDropDown}></i> */}
        </div>
        <div className='mt-6'>

      
      {
        categories.map((data , i) => (
          <MenuCard card={data} key={i} />
          
          
          
        ))
        
      }


      </div>
      <hr className={" border-slate-200 rounded-md border-" + (card["@type"] ? "[10px]" : "[4px]")}/> 
      </div>
    )
  }
  
  
}

export default MenuCard