import React from 'react'
import { Button } from './ui/button'
import { Link, PlusIcon } from 'lucide-react'

export const PropertiesHeader = () => {
  return (
    <div className = ' w-full relative py-2 flex justify-between items-center px-4 mt-2'>
       <h3 className = ' text-2xl font-bold text-stone-800/95'>
         Properties
       </h3>
       <button className='bg-sky-500/95 hover:bg-sky-500 transition-all duration-300
        text-neutral-100/95 px-4 py-2 rounded-md flex items-center gap-x-2 font-semibold'>
          <Link href='/listing/new'> 
          <span>
             Add property
           </span>
           <PlusIcon className=' size-4 text-neutral-50' />
          </Link>


       </button>
    </div>
  )
}
