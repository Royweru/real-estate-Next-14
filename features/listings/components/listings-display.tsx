import React from 'react'
import { ListingCardAdmin} from './listing-card-admin'
import { Amenity, Category, Image, Listing, Location, Status } from '@prisma/client'

export const ListingsDisplay = ({
    properties
}:{
    properties:(Listing&{
        images:Image[],
        amenities:Amenity[],
        status:Status,
        location:Location,
        category:Category
    })[]
}) => {
  return (
    <div className=' relative w-full py-4 md:py-6 lg:py-8'>
        <div className=' relative grid w-full lg:grid-cols-3 sm:grid-cols-2 gap-3 md:gap-2.5 lg:gap-2 px-4'>
            {properties.map((property)=>(
                <ListingCardAdmin
                 key={property.id}
                 data={property}
                />
            ))}
        </div>
    </div>
  )
}
