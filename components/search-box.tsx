"use client"

import React, { useState } from 'react'
import { SelectHeader } from './select-header'

export const SearchBox = () => {
    const [category,setCategory]  =useState("")
    const categories = [
        '1 Bedroom',
        '2 Bedroom',
        '3 Bedroom',
        'single Bedroom',
    ]
  return (
    <div className=' rounded-md bg-neutral-100/90 shadow-sm gap-x-1.5 flex items-center justify-center
     px-2 py-3 md:px-6 w-full mx-2 md:mx-0 md:w-[700px]'>
         
         <div className=" flex flex-col gap-y-0.5 relative w-full">
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
                {category}
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
            {categories?.map((category,idx) => (
              <option value={idx} key={idx}>
                {category}
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
            {categories?.map((category,idx) => (
              <option value={idx} key={idx}>
                {category}
              </option>
            ))}
          </select>
        </div>

    </div>
  )
}
