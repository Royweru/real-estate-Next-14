import React from 'react'
import { ListingType } from '../types'
import { BathIcon, BedIcon } from 'lucide-react'

export const IndividualListingExtraInfo = ({
    data}:{
    data:ListingType
}) => {
  return (
    <div className=' w-full'>   
         <div className=" relative px-2 w-full grid grid-cols-2 gap-2">
    <div className=" flex w-full flex-col gap-y-1 items-center col-span-1
     bg-neutral-100/95 rounded-md">
      <BedIcon className=" font-semibold text-text-darkblue size-7" />
      <div className=" relative w-full font-bold text-sm font-nunito flex gap-x-2 justify-center items-center">
        <span>{data?.bedrooms}</span>
        <p>Bedrooms</p>
      </div>
    </div>
    <div className=" flex w-full flex-col items-center gap-y-1 col-span-1 bg-neutral-100/95 rounded-md">
      <BathIcon className=" font-semibold text-text-darkblue size-7" />
      <div className=" w-full font-bold text-sm font-nunito flex gap-x-2 justify-center items-center">
        <span>{data?.bathrooms}</span>
        <p>Bathrooms</p>
      </div>
    </div>
    {/* <div className=" flex w-full flex-col gap-y-1 items-center col-span-1">
      
      <div className=" w-full font-bold text-sm font-nunito flex gap-x-2  justify-center items-center">
        
        <span>{data?.area}</span>
        <p>Metre squared</p>
      </div>
    </div> */}
  </div>
  </div>
  )
}
