import React from 'react'

export const InquiriesHeader = ({
    total
}:{
    total:number
}) => {
  return (
    <div className=' w-full relative flex gap-x-5 items-center py-4'>
        <h4 className=' text-2xl lg:text-3xl font-bold'>
          Total number of inquiries
        </h4>
        {total &&(
           <div className=' p-2 items-center justify-center bg-zinc-200/95 rounded-xl'>
              <p className='font-semibold'>
                {total}
            </p>
           </div>
        )}
    </div>
  )
}
