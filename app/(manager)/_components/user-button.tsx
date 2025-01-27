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
        <AvatarFallback className=' bg-gradient-to-br from-purple-500 via-purple-200 to-purple-400'>
        {user?.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='top' className= ' w-52 p-2' >   
            <DropdownMenuItem>
                 <Button 
                 className=' w-full relative'
                 variant='destructive'
                 >
                    <span className=' text-sm text-white font-semibold'>
                        Sign Out
                    </span>
                 </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
   
      )
}
