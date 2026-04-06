import React from 'react'
import { BlogsHeader } from './blogs-header'
import { BlogCard } from './blog-card'
import Link from 'next/link'

export const BlogsCTA = () => {
  return (
    <div className='w-full min-h-screen bg-black/90 pt-8 md:pt-10 lg:pt-12'>
      <div className='max-w-6xl mx-auto px-3 sm:px-4 lg:px-0 space-y-4'>
        <BlogsHeader />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-2 lg:gap-2.5'>
          {blogsDummyData.slice(0, 3).map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
      <div className='w-full relative min-h-[400px] h-screen bg-center bg-cover bg-no-repeat mt-4 md:mt-6 lg:mt-8' style={{ backgroundImage: `url('/townhouse1.jpg')` }}>
        <div className='inset-0 bg-gradient-to-t from-black/80 to-black/5 absolute'></div>
        <div className='absolute z-10 inset-0 flex flex-col justify-center items-center gap-y-2'>
          <h4 className='text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight text-center'>
            Get started posting and advertising your property today
          </h4>
          <p className='text-base text-neutral-50/90 font-normal max-w-2xl text-center'>
            Apartimenti is your best solution when it comes to finding renters or buyers
            for your properties
          </p>
          <Link href="/auth/sign-up">
            <button className='bg-blue-vista/85 hover:bg-blue-vista text-white text-sm px-10 py-3.5 cursor-pointer font-semibold mt-8 rounded-lg transition-colors'>
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const blogsDummyData = [
  {
    title: 'How to get the best mortgage rates in Kenya',
    excerpt: 'Discover tips and strategies to secure the lowest mortgage rates from Kenyan banks and SACCOs. Learn about fixed vs variable rates.',
    image: '/feature1.jpg',
    date: '2024-03-15',
    author: 'Sarah Wanjiku'
  },
  {
    title: 'Top 5 neighborhoods to invest in Nairobi',
    excerpt: 'From Westlands to Karen, explore the most promising areas for property investment with the highest ROI potential in 2024.',
    image: '/hero2.webp',
    date: '2024-02-28',
    author: 'James Mwangi'
  },
  {
    title: 'First-time home buyer guide for Kenya',
    excerpt: 'Everything you need to know about buying your first home — from budgeting and legal requirements to closing the deal.',
    image: '/house2.jpg',
    date: '2024-01-10',
    author: 'Grace Akinyi'
  },
]
