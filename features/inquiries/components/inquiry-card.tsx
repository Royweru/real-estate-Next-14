import { Inquiry } from '@prisma/client'
import React from 'react'

export const InquiryCard = ({
    data
}:{
    data:Inquiry
}) => {

  return (
    <div className='p-4 max-h-56 bg-neutral-50/85
    shadow-sm border-b-2 border-neutral-500/90 rounded-b-lg'>
       <div className='w-full relative flex  gap-x-4 items-center'>
         <div className=' flex flex-col gap-y-0.5'>
              <h4 className=' font-semibold text-sm font-mono tracking-wide text-neutral-900/85'> 
                    Name
              </h4>
              <p className='font-normal text-base'>
               {data.name}
              </p>
         </div>
         <div className=' flex flex-col gap-y-0.5'>
              <h4 className=' font-semibold text-sm font-mono tracking-wide text-neutral-900/85'> 
                    Email
              </h4>
              <p className='font-normal text-base'>
               {data.email}
              </p>
         </div>
         {data.phone&&(
                  <div className=' flex flex-col gap-y-0.5'>
                  <h4 className=' font-semibold text-sm font-mono tracking-wide text-neutral-900/85'> 
                        Phone number
                  </h4>
                  <p className='font-normal text-base'>
                   {data.phone}
                  </p>
             </div>
         )}
         {data.message&&(
                  <div className=' flex flex-col gap-y-0.5'>
                  <h4 className=' font-semibold text-sm font-mono tracking-wide text-sky-600/85'> 
                       Message
                  </h4>
                  <p className='font-normal text-sm tracking-normal leading-relaxed'>
                   {data.message}
                  </p>
             </div>
         )}
       
        
       </div>
    </div>
  )
}
