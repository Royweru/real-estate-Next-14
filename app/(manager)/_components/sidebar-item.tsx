"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LucideIcon } from 'lucide-react'

export const SidebarItem = ({
    label,
    icon: Icon,
    href
}:{
    label: string,
    icon: LucideIcon,
    href: string
}) => {
    const pathname = usePathname()
    const isActive = pathname === href || pathname.startsWith(href + '/')
  return (
    <Button 
     variant={isActive ? 'sidebarActive' : 'sidebar'}
     className='w-full'
    >
     <Link href={href}>
        <div className='gap-x-2.5 w-full flex items-center'>
            <Icon className='h-5 w-5 shrink-0' />
            <span className='text-sm font-medium'>
                {label}
            </span>
        </div>
     </Link>
    </Button>
  )
}
