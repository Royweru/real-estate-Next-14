"use client"
import { ArrowRight } from 'lucide-react'
import React from 'react'

export const BlogsHeader = () => {
  return (
    <div className=' py-2 border-b lg:mb-8 mb-6 border-white flex justify-between items-center'>
    <h2 className='text-white text-2xl font-semibold '>Get the latest blogs and news</h2>
    <button className=' bg-transparent hover:bg-transparent flex py-0 px-3 items-center justify-center cursor-pointer gap-x-2'>
        <span className=' text-white text-sm font-semibold'>
            View all
        </span>
   <ArrowRight  className=' size-4 text-white '/>
    </button>
</div>
  )
}
