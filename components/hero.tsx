import React from 'react'
import { SearchBox } from './search-box'
import { Category, Listing, Location, Type, User } from '@prisma/client'
import { HeroNav } from './hero-nav'

export const Hero = ({propertyTypes,categories,locations,user}:{propertyTypes:Type[],categories:Category[],locations:Location[],user:User &{
  listings:Listing[]
}| null}) => {
  return (
    <div className=' w-full min-h-screen bg-[url("/hero3.jpg")] bg-center bg-cover'>
       <div className=' absolute inset-0 bg-gradient-to-b from-black/40 to-transparent'></div>
       <div className='relative'>
         <HeroNav user= {user} />
       </div>
             <div className= 'h-screen w-full flex flex-col gap-y-2 justify-center items-center'>
           <div className=' flex flex-col items-center space-y-1 justify-center w-full relative text-center'>
              <p className=' lg:font-semibold  font-medium text-base capitalize text-neutral-50 hero-subheader '>
              feels good to be at home
              </p>
               <h3 className=' md:text-4xl font-semibold lg:font-bold leading-snug text-neutral-100 text-xl hero-header '>
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