"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const SidebarItem = ({
    label,
    iconSrc,
    href
}:{
    label:string,
    iconSrc:string,
    href:string
}) => {
    const pathname = usePathname()
    const isActive = pathname===href
  return (
    <Button 
     variant = {isActive? 'sidebarActive':"sidebar"}
     className=' w-full'
    >
     <Link href={href}>
        <div className='  relative gap-x-2 w-full flex items-center'>
            <img src={iconSrc} alt={label} height={20} width={20} />
            <span className=' text-sm '>
                {label}
            </span>
        </div>
     </Link>
    </Button>
  )
}
