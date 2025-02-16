"use server"

import {Resend} from 'resend'
import { EmailTemplate } from '@/components/email-template';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(email:string,token:string) =>{
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Hello there , verify your email',
    react: EmailTemplate({ token:`${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}` }),
  })
}