
import { Navbar } from '@/components/navbar'
import { serverUser } from '@/lib/serverUser'
import { redirect } from 'next/navigation'

import React from 'react'

const ListingLayout = async({children}:{
    children:React.ReactNode
}) => {
  const user = await serverUser()
  if(!user) redirect('/auth/sign-in')
  return (
    <div className=' min-h-screen w-full'>
       <Navbar user={user}/>
        {children}
    </div>
  )
}

export default ListingLayout