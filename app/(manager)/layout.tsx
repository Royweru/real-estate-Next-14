import React from 'react'

import { Sidebar } from './_components/sidebar'
import { serverUser } from '@/lib/serverUser'
import { MobileHeader } from './_components/mobile-header'

const ManagerLayout =async ({
    children
}:{
    children:React.ReactNode
}) => {
    const user = await serverUser()
  return (
    <div className=' w-full min-h-screen'>
         <div className=' w-full h-full flex relative '>
         <div className = ' w-[256px] h-full  lg:block hidden fixed top-0 left-0 overflow-y-auto border-r border-stone-800'>
            <Sidebar user = {user} />  
         </div>
         <div className=' w-full h-full  lg:pl-[256px] max-w-7xl mx-auto'>
             <MobileHeader user = {user} /> 
             <main className=' w-full relative mt-16 lg:mt-0 '>
                {children}
             </main> 
         </div>
         </div>
    </div>
  )
}

export default ManagerLayout