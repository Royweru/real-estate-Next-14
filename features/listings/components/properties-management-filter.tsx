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

    const [, setFilters]= useFiltersPropertiesAdmin()
    
    const onSearch = async()=>{
      setFilters({
        typeId:searchTypeId,
        locationId:searchLocationId,
        categoryId:searchCategoryId,
        statusId:searchStatusId
      })
    
    }
  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid w-full gap-3 text-sm text-stone-700 md:grid-cols-4">
          <select
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-stone-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-200"
            value={searchCategoryId}
            onChange={(e) => setSearchCategoryId(e.target.value)}
          >
            <option value="">Category</option>
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-stone-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-200"
            value={searchTypeId}
            onChange={(e) => setSearchTypeId(e.target.value)}
          >
            <option value="">Property type</option>
            {propertyTypes?.map((propertyType) => (
              <option value={propertyType.id} key={propertyType.id}>
                {propertyType.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-stone-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-200"
            value={searchStatusId}
            onChange={(e) => setSearchStatusId(e.target.value)}
          >
            <option value="">Status</option>
            {status?.map((statusOption) => (
              <option value={statusOption.id} key={statusOption.id}>
                {statusOption.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-stone-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-200"
            value={searchLocationId}
            onChange={(e) => setSearchLocationId(e.target.value)}
          >
            <option value="">Location</option>
            {locations?.map((location) => (
              <option value={location.id} key={location.id}>
                {location.county}, {location.city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onSearch}
            className="flex items-center gap-2 rounded-xl border border-sky-500 bg-sky-500/90 px-4 py-2 font-semibold text-white transition hover:bg-sky-600"
          >
            <SearchIcon className="size-4" />
            <span>Search</span>
          </button>
          <button
            onClick={() => {
              setFilters({
                typeId: "",
                locationId: "",
                categoryId: "",
                statusId: "",
              })
              setSearchCategoryId("")
              setSearchTypeId("")
              setSearchStatusId("")
              setSearchLocationId("")
            }}
            className="flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 font-semibold text-neutral-700 transition hover:border-neutral-400"
          >
            Reset filters
          </button>
        </div>
      </div>
    </div>
  )
}
