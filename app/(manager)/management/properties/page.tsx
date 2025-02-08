import { PropertiesHeader } from '@/components/properties-header'
import React from 'react'
import { FetchTypes } from '@/actions/fetchTypes'
import { fetchCategories } from '@/actions/fetchCategories'
import { fetchStatus } from '@/actions/fetchStatus'
import { PropertiesManagementFilter } from '@/features/listings/components/properties-management-filter'
import { ListingsDisplay } from '@/features/listings/components/listings-display'
import { getLocations } from '@/actions/fetchLocations'
import { fetchPropertiesManagement } from '@/actions/fetchProperties'

const PropertiesPage =async () => {
  const[categories,types,status,locations,properties ]  = await Promise.all([
    fetchCategories(),
    FetchTypes(),
    fetchStatus(),
    getLocations(),
    fetchPropertiesManagement()
  ])
  
  return (
    <div className=' w-full h-full flex flex-col gap-y-4'>
    <PropertiesHeader />
    <PropertiesManagementFilter  categories= {categories}
     propertyTypes={types} status={status} locations={locations}
    />
    <ListingsDisplay 
      properties= {properties}
    />
    </div>

  )
}

export default PropertiesPage