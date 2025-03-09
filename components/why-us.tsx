import React from 'react'
import { SectionHeader } from './section-header'

export const WhyUs = () => {
    const reasons= [
        {
           label:"Trusted by thousands",
           description:'This are some of the featured properties in the city right now',
           iconSrc:'/smilling-icon.png'
        },
        {
           label:"Wide range of properties",
           description:'This are some of the featured properties in the city right now',
           iconSrc:'/house-icon.png'
        },
        {
           label:"Financing made easy",
           description:'This are some of the featured properties in the city right now',
           iconSrc:'/finance-calculator.png'
        },
        {
           label:"See neighbours",
           description:'This are some of the featured properties in the city right now',
           iconSrc:'/neighbour-hood.png'
        },
    ]
  return (
    <div  className=' py-6 sm:py-8 md:py-10 lg:py-12 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0 bg-accent-honeyDew'>
         <SectionHeader
         title='Why you should choose us'
         sub='Reasons why we are the best realtors'
         />
         <div className=' w-full grid  max-w-6xl grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3'>
           {reasons.map((reason)=>(
            <div className=' col-span-1 flex flex-col gap-y-1 bg-white shadow-sm lg:h-min  p-4'>
               Fist 
            </div>
           ))}
         </div>
    </div>
  )
}
