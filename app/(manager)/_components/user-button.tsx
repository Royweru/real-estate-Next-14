'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { User } from '@prisma/client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { logout } from '@/actions/logout'


export const UserButton = ({user}:{user:User| null}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar className='size-12'>
          <AvatarImage src={user?.image || undefined}/>
        <AvatarFallback className=' bg-gradient-to-br from-purple-500 text-base font-bold text-neutral-100/90
         via-purple-500 to-purple-400'>
        {user?.name?.slice(0,2).toUpperCase()}
        </AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='top' className= ' w-52 p-2' >   
            <DropdownMenuItem>
              <Button variant={'outline'} className='w-full'
              onClick={()=>logout()} asChild
              >
                <span className=' text-sm'>
                    Sign Out
                </span>
              </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
   
      )
}
