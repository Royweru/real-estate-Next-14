"use client"
import React, { useTransition } from 'react'
import { Form, FormField, FormLabel, FormControl, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '../schemas'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const SignUpCard = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    
    const [isPending, startTransition] = useTransition()
    
    const onSubmit = async(vals:z.infer<typeof SignupSchema>)=>{
         startTransition(async () => {
             try{
                const res = await axios.post('/api/auth/register',vals)
                if(res.status === 201){
                    toast.success(res.data.message)
                    router.push('/auth/sign-in')
                    form.reset()
                }
             }catch(err){
                console.log(err)
                toast.error("Something went wrong",{
                    style: { background:'#ff0000', color:'#fff' }
                })
             }
         })
    }

  return (
    <div className='w-full'>
      <div className='mb-10'>
        <h1 className='text-[40px] font-bold font-montserrat tracking-tight text-neutral-900 mb-2 leading-tight'>
            Sign up
        </h1>
        <p className='text-neutral-600 font-sans text-[16px]'>
            Create an account to get started
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
           <FormField
             name='name'
             control={form.control}
             render={({field})=>(
              <FormItem className="space-y-2">
                 <FormLabel className='font-bold text-neutral-900 text-[15px]'>
                     Full Name
                 </FormLabel>
                 <FormControl>
                     <Input
                        type='text'
                        placeholder='Full Name'
                        {...field}
                        disabled={isPending}
                        className='bg-[#EBF3FF] border-transparent focus-visible:ring-2 focus-visible:ring-blue-capri text-neutral-900 h-12 rounded-lg font-medium px-4 text-base placeholder:text-neutral-500/80 shadow-none'
                     />
                 </FormControl>
              </FormItem>
             )}
            />
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
                        type='email'
                        placeholder='yourname@example.com'
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
                disabled={isPending}
                className='w-full h-12 font-bold text-[16px] bg-[#7ACAFA] hover:bg-[#68BEF0] text-neutral-800 rounded-lg shadow-none transition-all'
               >
                 Sign up
               </Button>
               <div className='text-[15px] text-neutral-600 mt-6'>
                 Already have an account?{' '}
                 <Link href="/auth/sign-in" className='text-[#5A9BD5] hover:text-[#4A8BC5] hover:underline font-semibold transition-colors'>
                   Sign in
                 </Link>
               </div>
            </div>
         </form>
      </Form>
    </div>
  )
}
