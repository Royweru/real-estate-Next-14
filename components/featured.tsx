import { ListingType } from '@/features/listings/types'
import React from 'react'
import { SectionHeader } from './section-header'
import { ListingCardClient } from '@/features/listings/components/listing-card-client'

export const FeaturedProperties = ({
  listings
}:{
  listings:ListingType[]
}) => {
  if(!listings) return 
  return (
    <div className=' py-6 sm:py-8 md:py-10 lg:py-12 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0'>
         <SectionHeader
              title='Featured properties'
              sub='This is a list of featured properties'
         />
         <div className=' grid w-full relative grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 lg:gap-2.5'>
          {listings.slice(1,5).map((property)=>(
            <ListingCardClient 
            key={property?.id}
            listing={property}
            isFeatured
           />
          ))}
           
         </div>
      </div>
  )
}
