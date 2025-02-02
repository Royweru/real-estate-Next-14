
import { ProfileSettingsHeader } from '@/app/(manager)/_components/profile-settings-header'
import { ProfileEditForm } from '@/features/auth/_components/profile-edit-form'
import React from 'react'
import { serverUser } from '@/lib/serverUser'
import { redirect } from 'next/navigation'

const ProfileSettingsPage = async () => {
  const activeUser = await serverUser()
  if(!activeUser) return redirect('/auth/sign-in')
  return (
    <div className=' w-full  relative  lg:p-6 p-4'>
        <div className='w-full h-full flex flex-col gap-y-4'>
             <ProfileSettingsHeader />  
             <ProfileEditForm user={activeUser} />
        </div>
    </div>
  )
}

export default ProfileSettingsPage