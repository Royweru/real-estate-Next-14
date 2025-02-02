import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import React from 'react'

export const ProfileSettingsHeader = () => {
  return (
    <div className=' w-full flex justify-between items-center'>
    <h3 className=' text-3xl font-bold text-neutral-850/90'>
      Profile Settings
    </h3>
    <Button 
     variant={"ghost"}
     size={"icon"}
    >
      <PencilIcon className=' size-4 text-zinc-800 font-bold'/>
    </Button>
  </div>
  )
}