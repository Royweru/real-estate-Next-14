"use client"
import { Category, Location, Status, Type } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import React,{useState} from 'react'

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
    const [propertyTypeId,setPropertyTypeId] = useState<string>("")
    const [categoryId,setCategoryId] = useState<string>("")
    const [statusId,setStatusId] = useState<string>("")
    const [locationId,setLocationId] = useState<string>("")
  return (
     <div className='relative max-w-4xl mx-auto py-2 px-2'>
        <div className=' flex items-center w-full relative gap-2.5 flex-wrap justify'>
           
                <select 
                  value={categoryId}
                  onChange={(e)=>setCategoryId(e.target.value)}
                 className=' p-2 rounded-md border border-slate-500/95 bg-neutral-200/95 text-neutral-700 shadow-sm'
                >
                       <option value="" defaultChecked>Choose a category</option>
                    {categories?.map((category)=>(
                   <option
                    value=""
                    key={category.id}
                    >
                          {category.name}
                   </option>
                    ))}
                </select>
                <select 
                 value={propertyTypeId}
                  onChange={(e)=>setPropertyTypeId(e.target.value)}
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

                  value={statusId}
                  onChange={(e)=>setStatusId(e.target.value)}
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

                  value={locationId}
                  onChange={(e)=>setLocationId(e.target.value)}
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
              <div className='relative'>
                     <button  className=' bg-sky-100/95 p-2 rounded-lg shadow-sm border-b-2 active:border-b-0 flex items-center gap-x-2 relative  justify-center font-semibold text-neutral-800/95'>
                        <p className=' font-semibold text-sm'>
                            Search
                        </p>
                        <SearchIcon className=' size-4 font-bold' />
                     </button>
              </div>
        </div>
     </div>
  )
}
