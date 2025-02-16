import React from 'react'

export const Success = ({message}:{
    message:string|undefined
}) => {
    if(!message) return
  return (
    <div className=' w-full p-4 flex items-center justify-center font-semibold bg-emerald-100 text-emerald-700'>
        <p className=''>
             {message}
        </p>
    </div>
  )
}
