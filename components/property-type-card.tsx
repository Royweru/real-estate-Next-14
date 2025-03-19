"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export const PropertyTypeCard = ({
    propertyType
}:{
    propertyType:{
        title:string,
        image:string,
        count:number,
        iconSrc:string
    }
}) => {
    const router = useRouter()
  return (
    <div 
    className=' col-span-1 rounded-md relative overflow-hidden'
    onClick={() =>router.push(`/browse?propertyType=${propertyType.title}`)}
    >
       <div className=' bg-center w-full lg:h-[400px] md:h-[350px] h-[280px] bg-cover' style={{backgroundImage: `url(${propertyType.image})`}}>
          <div className=' inset-0 absolute bg-gradient-to-t from-black/70 to-transparent'></div>
          <div className=' inset-0 absolute flex flex-col justify-end items-center gap-y-1 p-4'>
            {propertyType.iconSrc&& (
                <div>
                    <img src={propertyType.iconSrc} alt='property icon' className=' size-12' />
                </div>
            )}
              <h4 className=' fonts-bold text-white font-nunito text-base md:text-lg'>
                {propertyType.title}   
              </h4>
            <p className=' text-base font-semibold text-white font-nunito'>
                 {propertyType.count} properties
            </p>
          </div>
       </div>
    </div>
  )
}
