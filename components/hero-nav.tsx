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
import { MobileMenu } from './mobile-menu';

export const HeroNav = ({
    user
}: {
    user: User & {
        listings: Listing[]
    } | null
}) => {
    const signOut = () => logout()
    return (
        <nav className='w-full py-4 text-white z-20'>
            <div className='max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 relative'>
                <div className='w-full flex justify-between items-center'>
                    <div className="flex-shrink-0 items-center">
                        <a href="/">
                            <img src="/logo.png" alt="" height={52} width={70} />
                        </a>
                    </div>
                    {/*desktop menu */}
                    <div className="hidden md:flex space-x-4 items-center relative">
                        <a
                            href="/browse?categoryId=buy"
                            className="px-3 py-2 rounded-md transition-colors font-semibold text-amber-300 hover:bg-amber-50/10"
                        >
                            For Sale
                        </a>
                        <a
                            href="/browse?categoryId=rent"
                            className="px-3 py-2 rounded-md transition-colors font-semibold text-amber-300 hover:bg-amber-50/10"
                        >
                            For Rent
                        </a>
                        <a href="/browse" className="px-3 py-2 rounded-md transition-colors font-semibold hover:bg-amber-50/10">
                            Browse All
                        </a>
                    </div>
                    {/*user button*/}
                    {user ? (
                        <div className="hidden md:flex">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="relative w-full flex pl-1">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user?.image || ""} />
                                            <AvatarFallback className="bg-gradient-to-br from-sky-100 via-sky-400 to-sky-500">
                                                <p className="font-bold text-xl text-neutral-50">
                                                    {user?.name?.charAt(0).toUpperCase()}
                                                    {user?.name?.charAt(1).toUpperCase()}
                                                </p>
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="p-2" side="bottom">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <a href="/management/properties">
                                            <div className="w-full relative font-semibold flex items-center gap-x-2">
                                                <p>My Properties</p>
                                            </div>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <a href="/listing/new">
                                            <div className="w-full relative font-semibold flex items-center gap-x-2">
                                                Create listing
                                                <PlusIcon className="size-4 text-neutral-800" />
                                            </div>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <a href="/management/profile/edit">
                                            <div className="w-full relative font-semibold">
                                                Edit profile
                                            </div>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <div
                                            className="w-full relative font-semibold text-rose-600"
                                            onClick={signOut}
                                        >
                                            Logout
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center justify-center gap-x-3">
                            <a href="/auth/sign-in">
                                <Button variant={"outline"} className="font-semibold text-neutral-800">
                                    Login
                                </Button>
                            </a>
                            <a href="/auth/sign-up">
                                <Button variant={"destructive"} className="font-semibold text-neutral-100">
                                    Sign up
                                </Button>
                            </a>
                        </div>
                    )}
                    {/* mobile menu button */}
                    <MobileMenu />
                </div>
            </div>
        </nav>
    )
}
