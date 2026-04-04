"use client";

import Image from "next/image"
import { usePathname } from "next/navigation"

const AuthLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  const pathname = usePathname();
  
  const isSignUp = pathname === '/auth/sign-up';
  
  const heading = isSignUp ? "Start your journey today" : "Find your dream home today";
  const subheading = isSignUp 
    ? "Create an account to explore premium properties" 
    : "Discover exclusive listings in top locations";

  return (
    <div className='w-full min-h-screen flex bg-white flex-col md:flex-row'>
      {/* Left side: Image and overlay */}
      <div className="relative hidden md:flex flex-col justify-end w-1/2 p-16 overflow-hidden bg-black">
        <Image 
          src="/hero.jpg" 
          alt="Modern House" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 text-white pb-8">
          <h1 className="text-5xl font-bold mb-4 font-montserrat tracking-tight leading-[1.1]">
            {heading}
          </h1>
          <p className="text-[17px] text-gray-200 font-sans font-light">
            {subheading}
          </p>
        </div>
      </div>

      {/* Right side: Auth forms */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative min-h-screen bg-white">
        {/* Logo in top right */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={70} 
            height={70} 
            className="object-contain"
          />
        </div>
        
        {/* Form Container */}
        <div className="w-full max-w-[460px] px-8 py-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout