import React from 'react'
import { SectionHeader } from './section-header';
import { CitiesGrid } from './cities-grid';
import { LocationWithListingsProps } from '@/features/listings/types';

export const Cities = ({locations}:{
  locations:LocationWithListingsProps[]|null
}) => {

  return (
    <div className=' w-full max-w-6xl py-6 md:py-8 lg:py-10 space-y-2 mx-auto px-3 sm:px-4 md:px-4 lg:px-0`' >
        <SectionHeader title={"Top lisitings in top cities"} sub={"Discover some of the best properties in the following cites"} />
      <CitiesGrid data={locations}/>
    </div>
  )
}
