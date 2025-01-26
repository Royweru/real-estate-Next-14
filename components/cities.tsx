import React from 'react'
import { SectionHeader } from './section-header';
import { CitiesGrid } from './cities-grid';
import { Listing, Location } from '@prisma/client';

export const Cities = ({locations}:{
  locations:(Location&{
    properties:Listing[]
  })[]|null
}) => {

  return (
    <div className=' w-full px-1.5 md:px-6 lg:px-10 py-6 md:py-8 lg:py-10 space-y-2' >
        <SectionHeader title={"Top lisitings in top cities"} sub={"Discover some of the best properties in the following cites"} />
      <CitiesGrid data={locations}/>
    </div>
  )
}
