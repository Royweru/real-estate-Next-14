import React from 'react'

export const SectionHeader = ({
    title,
    sub
}:{
    title:string,
    sub?:string
}) => {
  return (
    <div className='flex flex-col items-center text-center justify-center gap-y-1.5 mb-4'>
        <h2 className=' lg:text-5xl md:text-4xl text-3xl font-bold  text-neutral-800/95 '>
             {title}
        </h2>
        <p className=' text-nunito lg:font-semibold font-normal sm:text-md text-sm text-text-darkblue'>
            {sub}
        </p>
        </div>
  )
}
