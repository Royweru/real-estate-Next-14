import { Location } from '@prisma/client'
import React from 'react'

export const IndividualListingHeader = ({
    title,location,priceType,rentalPrice,purchasePrice
}:{
    title:string|undefined,
    location:Location|undefined,
    priceType:string|undefined,
    rentalPrice:number |null|undefined,
    purchasePrice:number |null|undefined
}) => {
  return (
    <div className=' w-full flex items-center justify-between px-4 py-1'>
        <div className=' flex flex-col gap-y-2 '>
          <h4 className=' lg:text-4xl sm:text-2xl text-xl font-bold'>
            {title}
          </h4>
          <p className=' text-sm font-mono font-normal'>
           {location?.city},
           <span className=' ml-2'> 
            {location?.county}
           </span>
          </p>
        </div>
        <div className=' relative flex items-center justify-center gap-x-2'>
          <h3 className=' text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-700/95 '>
                {priceType==="purchase"?purchasePrice?.toLocaleString('en') :rentalPrice?.toLocaleString('en')}
          </h3>
          {priceType ==='rental' &&(
            <p className=' text-xs font-semibold text-zinc-500/80'>
            Per month
            </p>
          )}
        </div>
    </div>
  )
}
