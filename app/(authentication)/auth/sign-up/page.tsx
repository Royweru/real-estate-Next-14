import { SignUpCard } from '@/features/auth/_components/sign-up-card'
import { serverUser } from '@/lib/serverUser'
import { redirect } from 'next/navigation'
import React from 'react'

const SignUpPage = async() => {
  const activeUser = await serverUser()
  if(activeUser) redirect('/')
  return (
    <>
     <SignUpCard />
    </>
  )
}

export default SignUpPage