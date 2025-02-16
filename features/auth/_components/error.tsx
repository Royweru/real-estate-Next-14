import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
export const ErrorMessage = ({
    message
}:{
    message:string |undefined
}) => {
  if(!message) return 
  return (
    <div
    className="  p-4 bg-rose-600/25 text-sm font-semibold font-mono text rounded-md flex items-center
   justify-center gap-x-2 text-destructive"
  >
    <FaExclamationTriangle className=" text-rose-400 size-5 font-bold" />
    <p>{message}</p>
  </div>
  )
}
