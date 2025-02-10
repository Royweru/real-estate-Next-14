/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Category, Location, Status, Type } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import React,{useState} from 'react'
import { useFiltersPropertiesAdmin } from '../hooks/use-filters-admin'

export const PropertiesManagementFilter = ({
categories,
propertyTypes,
status,
locations
}:{
    categories:Category[],
    propertyTypes:Type[],
    status:Status[],
    locations:Location[]
}) => {
    const [searchTypeId,setSearchTypeId] = useState<string>("")
    const [searchCategoryId,setSearchCategoryId] = useState<string>("")
    const [searchStatusId,setSearchStatusId] = useState<string>("")
    const [searchLocationId,setSearchLocationId] = useState<string>("")

    const [{statusId},setFilters]= useFiltersPropertiesAdmin()
    
    const onSearch = async()=>{
      setFilters({
        typeId:searchTypeId,
        locationId:searchLocationId,
        categoryId:searchCategoryId,
        statusId:searchStatusId
      })
    
    }
  return (
     <div className='relative max-w-4xl mx-auto py-2 px-2'>
        <div className=' flex items-center w-full relative gap-2.5 flex-wrap justify'>
           
                <select 
                  value={searchCategoryId}
                  onChange={(e)=>setSearchCategoryId(e.target.value)}
                 className=' p-2 rounded-md border border-slate-500/95 bg-neutral-200/95 text-neutral-700 shadow-sm'
                >
                       <option value="" defaultChecked>Choose a category</option>
                    {categories?.map((category)=>(
                   <option
                    value={category.id}
                    key={category.id}
                    >
                          {category.name}
                   </option>
                    ))}
                </select>
                <select 
                 value={searchTypeId}
                  onChange={(e)=>setSearchTypeId(e.target.value)}
                 className=' p-2 rounded-md border border-slate-500/95 bg-neutral-200/95 text-neutral-700 shadow-sm'
                >
                    <option value="" defaultChecked>Property types</option>
                    {propertyTypes?.map((propertyType)=>(
                   <option
                    value={propertyType.id}
                    key={propertyType.id}
                    >
                          {propertyType.name}
                   </option>
                    ))}
                </select>
                <select 

                  value={searchStatusId}
                  onChange={(e)=>setSearchStatusId(e.target.value)}
                 className=' p-2 rounded-md border border-slate-500/95 bg-neutral-200/95 text-neutral-700 shadow-sm'
                >
                    <option value="" defaultChecked>Status</option>
                    {status?.map((status)=>(
                   <option
                    value={status.id}
                    key={status.id}
                    >
                          {status.name}
                   </option>
                    ))}
                </select>
                <select 

                  value={searchLocationId}
                  onChange={(e)=>setSearchLocationId(e.target.value)}
                 className=' p-2 rounded-md border border-slate-500/95 bg-neutral-200/95 text-neutral-700 shadow-sm'
                >
                    <option
                     value={""} 
                     defaultChecked>Location of the property</option>
                    {locations?.map((location)=>(
                   <option
                    value={location.id}
                    key={location.id}
                    >
                          {location.county},{location.city}
                   </option>
                    ))}
                   
                </select>
              <div className='relative gap-x-2 flex items-center justify-center'>
                     <button  
                     className=' bg-sky-100/95 p-2 rounded-lg 
                     shadow-sm border-b-2 active:border-b-0 flex
                      items-center gap-x-2 relative  justify-center 
                      font-semibold text-neutral-800/95'
                      onClick={onSearch}
                      >
                        <p className=' font-semibold text-sm'>
                            Search
                        </p>
                        <SearchIcon className=' size-4 font-bold' />
                     </button>
                     <button  
                     className=' bg-rose-500/95 p-2 rounded-lg 
                     shadow-sm border-b-2 active:border-b-0 flex
                      items-center gap-x-2 relative  justify-center 
                      font-semibold text-neutral-100/95'
                      onClick={()=>{setFilters({
                        typeId:"",
                        locationId:"",
                        categoryId:"",
                        statusId:""
                      })
                   
                    }}
                      >
                        <p className=' font-semibold text-sm'>
                            Reset
                        </p>
                        
                     </button>
              </div>
        </div>
     </div>
  )
}
