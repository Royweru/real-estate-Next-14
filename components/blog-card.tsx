/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import React from 'react'

export const BlogCard = ({
   blog
}:{
    blog:any,
}) => {
  return (
    <div className=' col-span-1 overflow-hidden cursor-pointer group border-white border'>
        <div className=' w-full relative flex flex-col gap-y-2'>
         <div className='md:h-[200px] lg:h-[220px] h-[180px] w-full relative'>
           <Image
            fill
            className=' bg-cover bg-center '
            src={blog.image}
            alt={blog.title.slice(0,10)}
             />
         </div>
         <div className=' px-3 space-y-2'>
          <div className=' text-start'>
          
             <span className=' text-sm text-white/70 font-normal'>
                5 min read
             </span>
          </div>
            <div className=' text-start'>
                 <h4 className=' text-white font-semibold text-base lg:text-lg font-nunito'>
                    {blog.title}
                 </h4>
                 </div>
            <div className='text-start'>
                 <p className=' text-sm text-white/80 font-normal'>
                    {blog.excerpt}
                 </p>
            </div>
         </div>
         <div className=' px-3 my-2 flex items-center  gap-x-2 '>
         <p className=' text-sm font-normal text-neutral-100/90'>
                 {blog.date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <span className=' text-[16px] text-white '>
                          .
            </span>
            <p className=' text-sm font-normal text-neutral-100/90'>
             by {blog.author}
            </p>
         </div>
         <div className=' my-1 px-3'>
         <hr  className=' bg-white text-white '/>
         </div>
            <div className=' px-3 flex justify-between items-center my-2'>
                <button className=' text-white text-sm font-semibold'>
                    Read more
                </button>
                <div className=' flex items-center gap-x-2'>
                    <span className=' text-white text-sm font-semibold'>
                        Share
                    </span>
                    <div className=' flex gap-x-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className=' size-4 text-white' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className=' size-4 text-white' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="23" y1="1" x2="1" y2="23" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    </div>
                </div>
                </div>
        </div>
    </div>
  )
}
