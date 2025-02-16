/* eslint-disable @typescript-eslint/no-unused-vars */
import { Footer } from '@/components/main-footer'
import { Navbar } from '@/components/navbar'
import { serverUser } from '@/lib/serverUser'
import React from 'react'

const PublicRoutesLayout = async({
    children
}:{
    children:React.ReactNode
}) => {
    const user = await serverUser()
  return (
    <>
    <Navbar user={user}/>
     <div className=' w-full min-h-screen '>
         {children}
     <Footer />
    </div>
    </>
   
  )
}

export default PublicRoutesLayout