import React from 'react'

import { Sidebar } from './_components/sidebar'
import { serverUser } from '@/lib/serverUser'

const ManagerLayout =async ({
    children
}:{
    children:React.ReactNode
}) => {
    const user = await serverUser()
  return (
    <div className=' w-full min-h-screen'>
         <div className=' w-full h-full flex relative '>
         <div className = ' w-[256px] h-full  lg:block hidden fixed top-0 left-0 overflow-y-auto border-r-2 border-stone-800'>
            <Sidebar user = {user} />
         </div>
         <div className=' w-full h-full  pl-[256px]'>
             {children}
         </div>
         </div>
    </div>
  )
}

export default ManagerLayout