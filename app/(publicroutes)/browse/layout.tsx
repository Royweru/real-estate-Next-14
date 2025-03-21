import { fetchCategories } from '@/actions/fetchCategories'
import { fetchLocations } from '@/actions/fetchLocations'
import { fetchStatus } from '@/actions/fetchStatus'
import { FetchTypes } from '@/actions/fetchTypes'
import { SearchFilters } from '@/components/search-filters'
import React from 'react'

const BrowseLayout =async ({
    children
}:{
    children:React.ReactNode
}) => {
    const [locations,status,propertyTypes,categories] = await Promise.all([
         fetchLocations(),
         fetchStatus(),
         FetchTypes(),
         fetchCategories()
    ])
  return (
    <div className=' w-full min-h-screen max-w-5xl py-4 mx-auto'>
        <div className=' grid md:grid-cols-12 grid-cols-8 relative gap-4 md:gap-3'>
           <div className=' md:col-span-4 col-span-8  sm:col-span-3 bg-sky-50 shadow-sm rounded-lg max-h-min p-2 md:p-4 '>
              <SearchFilters
              locations={locations}
               status={status} 
               propertyTypes={propertyTypes} 
               categories={categories} 
               />
           </div>
           <div className=' md:col-span-8 sm:col-span-5 col-span-8'>
           {children}
           </div>
        </div>
      
    </div>
  )
}

export default BrowseLayout