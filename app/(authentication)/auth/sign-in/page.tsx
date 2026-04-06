import { SignInCard } from '@/features/auth/_components/sign-in-card'
import { serverUser } from '@/lib/serverUser'
import { redirect } from 'next/navigation'
import React from 'react'

const SignInPage = async() => {
  const activeUser = await serverUser()
  if(activeUser) redirect('/')
  return (
   <>
    <SignInCard />
   </>
  )
}

export default SignInPage