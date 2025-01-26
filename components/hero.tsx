import React from 'react'
import { SearchBox } from './search-box'
import { Category, Location, Type } from '@prisma/client'

export const Hero = ({propertyTypes,categories,locations}:{propertyTypes:Type[],categories:Category[],locations:Location[]}) => {
  return (
    <div className=' w-full min-h-[400px] lg:min-h-[450px] bg-[url("/hero.jpg")] bg-center bg-cover'>
       {/* <div className=' absolute inset-0 bg-black/20'></div> */}
             <div className= ' h-[350px] lg:h-[450px] relative w-full flex flex-col gap-y-2 justify-center items-center'>
           <div className=' flex flex-col items-center space-y-1 justify-center w-full relative text-center'>
              <p className=' lg:font-semibold font-medium lg:text-base text-sm text-neutral-50/95 shadow-sm'>
              feels good to be at home
              </p>
               <h3 className=' md:text-4xl font-semibold lg:font-bold leading-snug text-neutral-100 text-xl shadow-sm'>
               Find your perfect home
               </h3>
           </div>
           <SearchBox 
           propertyTypes = {propertyTypes}
           categories = {categories}
           locations = {locations}
           />
       </div>
        </div>
  )
}