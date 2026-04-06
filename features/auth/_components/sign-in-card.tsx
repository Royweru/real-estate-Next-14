"use client"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/features/auth/schemas'

import * as z from 'zod';
import React from 'react'

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Login } from '@/actions/login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignInCard = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: "",
    },
  });

  const onsubmit = async(vals:z.infer<typeof LoginSchema>)=>{
    startTransition(async()=>{
        const res = await Login(vals)
        if(res?.error){
            toast.error(res.error,{
                style:{ backgroundColor:"red", color:"#fff" }
            })
        } else {
            toast.success(res.message||"Successfully logged in",{
                style:{ backgroundColor:"green", color:"#fff" }
            })  
            router.push('/')
            router.refresh()
        }
    })
  }

  return (
    <div className='w-full'>
      <div className='mb-10'>
        <h1 className='text-[40px] font-bold font-montserrat tracking-tight text-neutral-900 mb-2 leading-tight'>
            Sign in
        </h1>
        <p className='text-neutral-600 font-sans text-[16px]'>
            Welcome back user we missed you
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>
           <FormField
             name='email'
             control={form.control}
             render={({field})=>(
              <FormItem className="space-y-2">
                 <FormLabel className='font-bold text-neutral-900 text-[15px]'>
                     Email
                 </FormLabel>
                 <FormControl>
                     <Input
                        placeholder='johndoe@gmail.com'
                        {...field}
                        disabled={isPending}
                        className='bg-[#EBF3FF] border-transparent focus-visible:ring-2 focus-visible:ring-blue-capri text-neutral-900 h-12 rounded-lg font-medium px-4 text-base placeholder:text-neutral-500/80 shadow-none'
                     />
                 </FormControl>
              </FormItem>
             )}
            />
           <FormField
             name='password'
             control={form.control}
             render={({field})=>(
              <FormItem className="space-y-2">
                 <FormLabel className='font-bold text-neutral-900 text-[15px]'>
                     Password
                 </FormLabel>
                 <FormControl>
                     <Input
                        placeholder='••••••••••••••••'
                        type='password'
                        {...field}
                        disabled={isPending}
                        className='bg-[#EBF3FF] border-transparent focus-visible:ring-2 focus-visible:ring-blue-capri text-neutral-900 h-12 rounded-lg font-medium px-4 tracking-widest text-base shadow-none'
                     />
                 </FormControl>
              </FormItem>
             )}
            />
            <div className='w-full flex justify-center items-center flex-col pt-4'>
               <Button 
                type='submit'
                className='w-full h-12 font-bold text-[16px] bg-[#7ACAFA] hover:bg-[#68BEF0] text-neutral-800 rounded-lg shadow-none transition-all'
                disabled={isPending}
               >
                 Sign in
               </Button>
               <div className='text-[15px] text-neutral-600 mt-6'>
                 Don&apos;t have an account?{' '}
                 <Link href="/auth/sign-up" className='text-[#5A9BD5] hover:text-[#4A8BC5] hover:underline font-semibold transition-colors'>
                   Sign up
                 </Link>
               </div>
            </div>
         </form>
      </Form>
    </div>
  )
}

