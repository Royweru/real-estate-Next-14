"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/features/auth/schemas'
import axios from 'axios'
import * as z from 'zod';
import React from 'react'

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const SignInCard = () => {
const router = useRouter()
const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: "",
    },
    });

    const onsubmit = async(vals:z.infer<typeof LoginSchema>)=>{
        try {
          const res = await axios.post('/api/auth/login',vals)
          if(res.status === 200){
            toast.success(res.data.message)
            router.refresh()
          }
        } catch (error) {
            console.log(error)

        }
       
     
       
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
                    <FormLabel className=' font-semibold'>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder='johndoe@gmail.com...'
                            {...field}
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
                    <FormLabel className=' font-semibold'>
                        Password
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder='********'
                            type='password'
                            {...field}
                            />
                    </FormControl>
                 </FormItem>
                )}
                />
                <div className=' w-full flex justify-center items-center'>
                       <Button type='submit'
                        className=' bg-neutral-800 text-white hover:bg-neutral-900 font-semibold'>
                        Sign in
                       </Button>
                </div>
             </form>
        </Form>
      </div>
    </CardContent>
   </Card>
  )
}

