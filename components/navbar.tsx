"use client";
import { Listing, User } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { logout } from "@/actions/logout";

export const Navbar = ({ 
  user
 }: {
   user: User&{
   listings:Listing[]
   } | null
   }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
 const signout = () =>logout()
  const subMenu1 = [
    {
      id: 1,
      label: "Apartments for sale",
      onClick: () => {},
    },
    {
      id: 2,
      label: "Houses for rent",
      onClick: () => {},
    },
    {
      id: 3,
      label: "Commercial buildings for rent ",
      onClick: () => {},
    },
  ];
  const subMenu2 = [
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
      label: "Commercial buildings for sale",
      onClick: () => {},
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 80) {
          navRef.current.classList.add("sticky-nav", "fixed", "border-b");
        } else {
          navRef.current.classList.remove("sticky-nav", "fixed", "border-b");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-white w-full top-0 z-20 transition-all duration-300 text-base rounded-b"
    >
      <div className="max-w-5xl  mx-auto px-4 relative py-2 sm:px-6 lg:px-8">
        <div className="flex relative w-full justify-between items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo.png" alt="" height={60} width={100} />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 rounded-md 
                transition-colors hover:bg-blue-100 focus:outline-none"
              >
                <span className=" text-blue-france ">For sale</span>
                <svg
                  className="ml-1 h-4 w-4 fill-current text-blue-france"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
                {subMenu1.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="block text px-4 py-2 hover:bg-blue-100 rounded-md"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-blue-100 focus:outline-none"
              >
                <span className=" text-blue-france">For rent</span>
                <svg
                  className="ml-1 h-4 w-4 fill-current text-blue-france"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
                {subMenu2.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="block text px-4 py-2 hover:bg-blue-100 rounded-md"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <a href="#" 
            className="px-3 py-2 rounded-md transition-colors font-semibold">
              About
            </a>
            <a href="/blog" className="px-3 py-2 rounded-md transition-colors font-semibold">
              Blog
            </a>
            <a href="#" className="px-3 py-2 rounded-md transition-colors font-semibold">
              Contact
            </a>
          </div>
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
                     onClick={signout}
                     >
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className=" hidden md:flex items-center justify-center gap-x-3">
              <a href="/auth/sign-up">
              <Button
                variant={"outline"}
                className=" font-semibold text-neutral-800"
              >
                Sign up
              </Button>
              </a>
            <a href="/auth/sign-in">
            <Button
                variant={"destructive"}
                className=" font-semibold text-neutral-100"
              >
                Sign in 
              </Button>
            </a>
        
            </div>
          )}
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li>
              {/* Mobile dropdown for Services */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-blue-100 focus:outline-none"
              >
                <span>Apartments</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  {mobileMenuOpen ? (
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  ) : (
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  )}
                </svg>
              </button>
              {mobileMenuOpen && (
                <ul className="pl-4 mt-1 space-y-1">
                  {subMenu1.map((item) => (
                    <li key={item.id}>
                      <a href="#" className="block text px-4 py-2  rounded-md">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              {/* Mobile dropdown for Services */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-blue-100 focus:outline-none"
              >
                <span>Houses</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  {mobileMenuOpen ? (
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  ) : (
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  )}
                </svg>
              </button>
              {mobileMenuOpen && (
                <ul className="pl-4 mt-1 space-y-1">
                  {subMenu2.map((item) => (
                    <li key={item.id}>
                      <a href="#" className="block text px-4 py-2  rounded-md">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 rounded-md transition-colors "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="block px-3 py-2 rounded-md transition-colors "
              >
                Blog
              </a>
            </li>
            {user && (
              <li>
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
                  <DropdownMenuContent className=" p-2" side="right">
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
                     onClick={signout}
                     >
                      Logout
                    </div>
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
