import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'
import React from 'react'
import { User } from '@prisma/client'

export const MobileSidebar = ({user}:{user:User| null}) => {
  return (
    <Sheet>
        <SheetTrigger>
            <MenuIcon className=' text-neutral-50 size-8 font-bold' />
        </SheetTrigger>
        <SheetContent className=' p-0 z-[100]' side={'left'}>
            <Sidebar user = {user} />
        </SheetContent>
    </Sheet>
  )
}
