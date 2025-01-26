import React from 'react'

export const SectionHeader = ({
    title,
    sub
}:{
    title:string,
    sub?:string
}) => {
  return (
    <div className='flex flex-col items-center text-center justify-center gap-y-1.5 my-1'>
        <h2 className=' lg:text-5xl md:text-4xl text-3xl font-bold  text-text-darkblue '>
             {title}
        </h2>
        <p className=' text-nunito lg:font-semibold font-normal sm:text-md text-sm text-neutral-400/95'>
            {sub}
        </p>
        </div>
  )
}
