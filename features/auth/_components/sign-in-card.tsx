"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {  useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/features/auth/schemas'

import * as z from 'zod';
import React from 'react'

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Login } from '@/actions/login';

export const SignInCard = () => {
  const [isPending,startTransition] = useTransition()
// const router = useRouter()
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
                toast.error(res?.error,{
                  style:{
                    backgroundColor:"red",
                    color:"#fff"
                  }
                })
            }else{
                toast.success(res?.message||"Successfully logged in",{
                  style:{
                    backgroundColor:"green",
                    color:"#fff"
                  }
                })  
                window.location.reload()
            }
        } )
    }
  return (
    <Card className=' w-full mx-3 md:mx-0 md:w-[600px] shadow-sm rounded-xl '>
    <CardHeader>
       <CardTitle className=' w-full text-xl font-semibold text-neutral-800 text-center'>
           Welcome back user we missed you
       </CardTitle>
    </CardHeader>
    <CardContent>
      <div className=' w-full relative px-6'>
        <Form {...form}>
             <form action="" onSubmit={form.handleSubmit(onsubmit)}
                 className=' space-y-2'
                >
               <FormField
                 name='email'
                 control={form.control}
                render={({field})=>(
                 <FormItem>
                    <FormLabel className=' font-semibold text-neutral-900'>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder='johndoe@gmail.com...'
                            {...field}
                            disabled={isPending}
                            />
                    </FormControl>
                 </FormItem>
                )}
                />
               <FormField
                 name='password'
                 control={form.control}
                render={({field})=>(
                 <FormItem>
                    <FormLabel className=' font-semibold text-neutral-900'>
                        Password
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder='********'
                            type='password'
                            {...field}
                            disabled={isPending}
                            />
                    </FormControl>
                 </FormItem>
                )}
                />
                <div className=' w-full flex justify-center items-center flex-col gap-y-2'>
                       <Button type='submit'
                        className=' font-semibold'
                        variant='outline'
                        disabled={isPending}
                        >
                        Sign in
                       </Button>
                       <a href="/auth/sign-up" className=' text-sm hover:underline  cursor-pointer text-neutral-800 hover:text-neutral-900 font-semibold'>
                        Don&apos;t have an account? Sign up
                       </a>
                </div>
             </form>
        </Form>
      </div>
    </CardContent>
   </Card>
  )
}

