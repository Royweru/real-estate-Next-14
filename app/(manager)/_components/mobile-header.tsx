import { User } from '@prisma/client'

import React from 'react'
import { MobileSidebar } from './mobile-sidebar'

export const MobileHeader = ({user}:{user:User| null}) => {
  return (
    <div className=' w-full bg-neutral-800/95 h-16 flex items-center fixed top-0 z-50 lg:hidden'>
      <MobileSidebar user = {user} />
    </div>
  )

}
