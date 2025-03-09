import { BathIcon, BedIcon } from 'lucide-react'
import { TbMeterSquare } from "react-icons/tb";
import React from 'react'

export const ListingIconDetails = ({
    bedrooms, coverage, bathrooms
}:{
    bedrooms:number|undefined,
    coverage:number,
    bathrooms:number
}) => {
  return (
    <div className=' w-full flex items-center justify-between'>
           {bedrooms && (
               <div className=' flex w-full flex-col gap-y-0.5 items-center justify-center'>
               <BedIcon  className=' size-4 shrink-0'/>
               <p className='  text-xs '>
              {bedrooms} beds
               </p>
          </div>
          )}
    
        <div className=' flex flex-col w-full gap-y-0.5 items-center justify-center'>
            <BathIcon className=' size-4 shrink-0' />
             <p className='  text-xs '>
            {bathrooms} bathrooms
             </p>
        </div>
        <div className=' flex flex-col  w-full gap-y-0.5 items-center justify-center'>
             <TbMeterSquare className=' size-4 font-bold'/>
             <p className='  text-xs shrink-0'>
             {coverage} M
             </p>
        </div>
    
    </div>
  )
}
