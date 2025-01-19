"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import React from 'react'

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

export const SignInCard = () => {

  
const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: "",
    },
    });
    
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
             <form action="" onSubmit={form.handleSubmit(()=>{})}
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
             </form>
        </Form>
      </div>
    </CardContent>
   </Card>
  )
}

