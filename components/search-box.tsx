"use client"

import React, { useState } from 'react'
import { SelectHeader } from './select-header'
import { Category, Location, Type } from '@prisma/client'

export const SearchBox = ({propertyTypes,categories,locations}:{propertyTypes:Type[],categories:Category[],locations:Location[]}) => {
    const [category,setCategory]  =useState("")

  return (
    <div className=' rounded-md bg-neutral-100/90 shadow-sm gap-x-1.5 flex items-center justify-center
     px-2 py-3 md:px-6 w-full mx-2 md:mx-0 md:w-[700px] relative'>
         
         <div className=" flex flex-col relative w-full">
          <SelectHeader dataType="category" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" bg-gray-100/85 border border-b-2 px-2  relative w-full py-2
             focus:ring-0 focus:border-0 "
          >
            <option value={''} selected>
                  Choose category
            </option>
            {categories?.map((category,idx) => (
              <option value={idx} key={idx}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

         <div className=" flex flex-col gap-y-0.5 relative w-full">
          <SelectHeader dataType="location" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
             className=" bg-gray-100/85 border border-b-2 px-2  relative w-full py-2
             focus:ring-0 focus:border-0 "
          >
            <option value={''} selected>
                  Choose location
            </option>
            {locations?.map((location,idx) => (
              <option value={idx} key={idx}>
                {location.county} , {location.city}
              </option>
            ))}
          </select>
        </div>

         <div className=" flex flex-col gap-y-0.5 relative w-full">
          <SelectHeader dataType="type" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" bg-gray-100/85 border border-b-2 px-2  relative w-full py-2
             focus:ring-0 focus:border-0 "
          >
            <option value={''} selected>
                  Choose type
            </option>
            {propertyTypes?.map((type,idx) => (
              <option value={idx} key={idx}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

    </div>
  )
}
