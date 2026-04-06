import Link from 'next/link'
import React from 'react'
import { SidebarItem } from './sidebar-item'
import { UserButton } from './user-button'
import { User } from '@prisma/client'
import { Building2, Mail, UserCircle, ShieldCheck } from 'lucide-react'

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
           <div className = 'flex flex-col  w-full gap-y-2 flex-1 px-3 '>
               <SidebarItem 
                label='Properties'
                icon={Building2}
                href='/management/properties'
               />
               <SidebarItem 
                label='Inquiries'
                icon={Mail}
                href='/management/inquiries'
               />
               <SidebarItem 
                label='Profile'
                icon={UserCircle}
                href='/management/profile/edit'
               />
               {user?.role === "ADMIN" && (
                 <SidebarItem 
                  label='Approvals'
                  icon={ShieldCheck}
                  href='/management/approvals'
                 />
               )}
           </div>
           <div className=' p-4 w-full'>
                <UserButton user={user} />
           </div>
     </div>
  )
}
