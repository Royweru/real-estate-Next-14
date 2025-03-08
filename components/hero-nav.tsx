"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
  import { PlusIcon } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
  import { Button } from './ui/button';
  import { logout } from '@/actions/logout';
import { Listing, User } from '@prisma/client';
export const HeroNav = ({
    user
}:{
    user:User&{
        listings:Listing[]
    }| null
}) => {
    const subMenu1 = [
        {
          id: 1,
          label: "Apartments for sale",
          onClick: () => {},
        },
        {
          id: 2,
          label: "Houses for sale",
          onClick: () => {},
        },
        {
          id: 3,
          label: "Commercial buildings for sale ",
          onClick: () => {},
        },
      ];
      const subMenu2 = [
        {
          id: 1,
          label: "Apartments for rent",
          onClick: () => {},
        },
        {
          id: 2,
          label: "Houses for rent",
          onClick: () => {},
        },
        {
          id: 3,
          label: "Commercial buildings for rent",
          onClick: () => {},
        },
      ];
      const signOut = ()=>logout()
  return (
    <nav className=' absolute w-full top-2 left-0 text-white  z-20'>
        <div className='max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 relative'>
            <div className='w-full flex justify-between items-center'>
            <div className="flex-shrink-0 items-center ">
            <a href="/">
              <img src="/logo.png" alt="" height={52} width={70} />
            </a>
          </div>
          {/*desktop menu */}

          <div className="hidden md:flex space-x-4 items-center relative">
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 rounded-md 
                transition-colors hover:bg-amber-50 focus:outline-none"
              >
                <span className=" text-amber-300 font-semibold">For sale</span>
                <svg
                  className="ml-1 h-4 w-4 fill-current text-amber-300"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-black/75 border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
                {subMenu1.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="block text-sm px-4 py-2 hover:bg-neutral-800 
                    rounded-md"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors
                 hover:bg-amber-50 focus:outline-none"
              >
              <span className=" text-amber-300 font-semibold">For Rent</span>
                <svg
                  className="ml-1 h-4 w-4 fill-current text-amber-300 font-semibold"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-black/75 border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
                {subMenu2.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="block text-sm px-4 py-2
                     hover:bg-neutral-800 rounded-md "
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <a href="/about" 
            className="px-3 py-2 rounded-md transition-colors font-semibold">
              About
            </a>
            <a href="/blog" className="px-3 py-2 rounded-md transition-colors font-semibold">
              Blog
            </a>
            <a href="/contact" className="px-3 py-2 rounded-md transition-colors font-semibold">
              Contact
            </a>
          </div>

            {/*user button*/}
            {user ? (
            <div className="hidden md:flex ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className=" relative w-full flex pl-1">
                    <Avatar className=" size-12">
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback className=" bg-gradient-to-br from-sky-100 via-sky-400 to-sky-500  ">
                        <p className=" font-bold text-2xl text-neutral-50">
                          {user?.name?.charAt(0).toUpperCase()}
                          {user?.name?.charAt(1).toUpperCase()}
                        </p>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" p-2 " side="bottom">
                {user.listings.length>0 &&(
                    <DropdownMenuItem className="cursor-pointer">
                    <a href="/management/properties">
                      <div className=" w-full relative font-semibold flex items-center  gap-x-2">
                        <p>
                          Dashboard
                        </p>
                      </div>
                    </a>
                  </DropdownMenuItem>
                   )}
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="/listing/new">
                      <div className=" w-full relative font-semibold flex items-center  gap-x-2">
                        Create listing
                        <PlusIcon className="size-4 text-neutral-800" />
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="/management/profile/edit">
                    <div className=" w-full relative font-semibold">
                      Edit profile
                    </div>
                    </a>
                   
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <div
                     className=" w-full relative 
                     font-semibold text-rose-600"
                     onClick={signOut}
                     >
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className=" hidden md:flex items-center justify-center gap-x-3">
              <a href="/auth/sign-in">
              <Button
                variant={"outline"}
                className=" font-semibold text-neutral-800"
              >
              Login
              </Button>
              </a>
            <a href="/auth/sign-up">
            <Button
                variant={"destructive"}
                className=" font-semibold text-neutral-100"
              >
               Sign up
              </Button>
            </a>
        
            </div>
          )}
          
            </div>
        </div>
    </nav>
  )
}
