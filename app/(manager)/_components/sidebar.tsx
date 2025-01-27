import Link from 'next/link'
import React from 'react'
import { SidebarItem } from './sidebar-item'
import { UserButton } from './user-button'
import { User } from '@prisma/client'

export const Sidebar = (
{user}:{
    user:User | null
}
) => {
  return (
     <div className=' relative w-full h-full  flex flex-col '>
           <Link href={'/'}>
              <div className=' pb-7 pt-8 pl-4 flex items-center gap-x-3'>
                <img src='/logo.png' alt='logo' height={100} width={75} />
                <span className=' text-stone-800/95 text-md font-bold'>
                    Apartamenti
                </span>
              </div>
           </Link>
           <div className = 'flex flex-col  w-full gap-y-4 flex-1 px-4 '>
               <SidebarItem 
                label='Properties'
                iconSrc = '/propertyicon.png'
                href = '/management/properties'
               />
               <SidebarItem 
                label='Enquiries'
                iconSrc = '/alerts.png'
                href = '/management/enquiries'
               />
               <SidebarItem 
                label='Profile'
                iconSrc = '/profileicon.jpeg'
                href = '/management/profile'
               />
           </div>
           <div className=' p-4 w-full'>
                <UserButton user={user} />
           </div>
     </div>
  )
}
