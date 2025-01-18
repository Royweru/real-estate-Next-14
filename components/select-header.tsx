
import React from 'react'


interface CustomHeaderProps{

    dataType:"location"|"type"|"category"
}
export const SelectHeader = ({
  
    dataType
}:CustomHeaderProps) => {

  return (
        <h4 className=' font-semibold font-montserrat text-sm w-full text-center text-neutral-800/95'>
          {
            dataType==="location"?"Location":dataType==="category"?"Category":"Type"
          }
        </h4>

   
  )
}
