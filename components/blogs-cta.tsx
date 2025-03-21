import React from 'react'
import { BlogsHeader } from './blogs-header'
import { BlogCard } from './blog-card'

export const BlogsCTA = () => {
  return (
    <div className=' w-full min-h-screen bg-black/90 pt-8 md:pt-10 lg:pt-12 '>
      <div className='max-w-6xl mx-auto px-3 sm:px-4 lg:px-0  space-y-4' >
          <BlogsHeader />
           <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-2 lg:gap-2.5'>
              {blogsDummyData.slice(0,3).map((blog,index)=>(
                 <BlogCard key={index} blog={blog} />
              ))}
           </div>
        </div>
        <div className='w-full relative min-h-[400px] h-screen bg-center bg-cover bg-no-repeat mt-4 md:mt-6 lg:mt-8  ' style={{backgroundImage:`url('/townhouse1.jpg')`}}>
            <div className=' inset-0 bg-gradient-to-t from-black/80 to-black/5 absolute'></div>
            <div className=' absolute z-10 inset-0 flex flex-col justify-center items-center gap-y-2'>
                 <h4 className=' text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight text-center'>
                 Get started posting and advertising your property today
                 </h4>
                 <p className=' text-base text-neutral-50/90 font-normal max-w-2xl text-center'>
                 Apartimenti is your best solution when it comes to finding renters or buyers 
                 for your properties 
                 </p>
                 <button className=' bg-blue-vista/85 hover:bg-blue-vista text-white text-sm px-10 py-3.5 cursor-pointer font-semibold mt-8'>
                    Get started
                 </button>
            </div>
          
        </div>
    </div>
   
  )
}


const blogsDummyData = [
  { 
    title: 'How to get the best mortgage rates', 
    excerpt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas. Donec ',
     image: '/feature1.jpg',
      date: '2021-09-01', 
      author: 'John Doe' 
    },
 
  { 
    title: 'How to get the best mortgage rates', 
    excerpt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas. Donec ',
     image: '/hero2.webp',
      date: '2021-09-01', 
      author: 'John Doe' 
    },
 
  { 
    title: 'How to get the best mortgage rates', 
    excerpt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas. Donec ',
     image: '/house2.jpg',
      date: '2021-09-01', 
      author: 'John Doe' 
    },
 
  { 
    title: 'How to get the best mortgage rates', 
    excerpt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas. Donec ',
     image: '/land.jpg',
      date: '2021-09-01', 
      author: 'John Doe' 
    },
 
]