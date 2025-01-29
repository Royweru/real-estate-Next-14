import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { User } from '@prisma/client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
  

export const UserButton = ({user}:{user:User| null}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar>
        <AvatarFallback className=' bg-gradient-to-br from-purple-500 text-base font-bold text-neutral-100/90
         via-purple-500 to-purple-400'>
        {user?.name?.charAt(0).toUpperCase()}
        {user?.name?.charAt(1).toUpperCase()}
        </AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='top' className= ' w-52 p-2' >   
            <DropdownMenuItem className='bg-rose-500 hover:bg-rose-600 text-white 
            font-semibold hover:cursor-pointer '>
                <span className=' text-sm'>
                    Sign Out
                </span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
   
      )
}
