import React from 'react'
import { SearchBox } from './search-box'
import { Category, Listing, Type, User } from '@prisma/client'
import { HeroNav } from './hero-nav'
import { ArrowDown, Home, Users, MapPin } from 'lucide-react'

export const Hero = ({
  propertyTypes,
  categories,
  locations,
  user
}:{
  propertyTypes:Type[],
  categories:Category[],
  locations: { id: string; county: string; city: string; properties: unknown[] }[],
  user:User &{
  listings:Listing[]
}| null}) => {
  const totalListings = locations.reduce((acc, loc) => acc + loc.properties.length, 0)
  const totalCities = locations.length

  return (
    <div className='relative w-full min-h-screen flex flex-col bg-[url("/hero3.jpg")] bg-center bg-cover'>
      {/* Gradient overlay - lighter at center so content pops, darker at edges */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50'></div>
      
      {/* Nav */}
      <div className='relative z-20'>
        <HeroNav user={user} />
      </div>

      {/* Centered content - flex-1 takes remaining space, justify-center truly centers */}
      <div className='relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10'>
        <div className='flex flex-col items-center space-y-5 w-full text-center max-w-3xl'>
          <p className='lg:font-semibold font-medium text-base capitalize text-violet-300 hero-subheader tracking-wide'>
            Kenya&apos;s trusted property marketplace
          </p>
          <h3 className='md:text-5xl font-bold leading-tight text-white text-3xl hero-header text-balance'>
            Find your perfect home today
          </h3>
          <p className='text-neutral-200/90 text-base max-w-xl'>
            Browse thousands of verified listings for rent and sale across Kenya. From cozy bedsitters to luxury villas — your next property is here.
          </p>
        </div>

        {/* SearchBox - truly centered, no fixed widths causing offset */}
        <div className='mt-10 flex w-full justify-center'>
          <SearchBox
            propertyTypes={propertyTypes}
            categories={categories}
            locations={locations}
          />
        </div>

        {/* Stats bar - backdrop blur pill so it's readable on any background */}
        <div className='mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 rounded-full bg-white/10 px-6 py-4 backdrop-blur-md ring-1 ring-white/20'>
          <div className='flex items-center gap-2 text-white'>
            <Home className='h-5 w-5 text-violet-400' />
            <span className='text-sm font-semibold'>{totalListings > 0 ? totalListings : '500'}+ Properties</span>
          </div>
          <div className='hidden h-4 w-px bg-white/20 sm:block' />
          <div className='flex items-center gap-2 text-white'>
            <Users className='h-5 w-5 text-violet-400' />
            <span className='text-sm font-semibold'>2,000+ Clients</span>
          </div>
          <div className='hidden h-4 w-px bg-white/20 sm:block' />
          <div className='flex items-center gap-2 text-white'>
            <MapPin className='h-5 w-5 text-violet-400' />
            <span className='text-sm font-semibold'>{totalCities > 0 ? totalCities : '15'}+ Cities</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce'>
          <span className='text-[11px] font-medium tracking-widest uppercase'>Scroll to explore</span>
          <ArrowDown className='h-4 w-4' />
        </div>
      </div>
    </div>
  )
}
