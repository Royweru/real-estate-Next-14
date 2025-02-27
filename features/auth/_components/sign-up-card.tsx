"use client"
import React from 'react'

import { 
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
    
} from '@/components/ui/card'
import { 
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormItem,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '../schemas'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export const SignUpCard= () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver:zodResolver(SignupSchema),
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })
    const onSubmit =async(vals:z.infer<typeof SignupSchema>)=>{
         try{
            const res = await axios.post('/api/auth/register',vals)
            if(res.status ===201){
                toast.success(res.data.message)
                router.push('/auth/sign-in')
                form.reset()
            }
         }catch(err){
            console.log(err)
            toast.error("Something went wrong",{
                style:{
                    background:'#ff0000',
                    color:'#fff'
                }
            })
         }
    }
  return (
    <Card className=' w-full mx-3 md:mx-0 md:w-[600px] shadow-sm rounded-xl '>
    <CardHeader>
       <CardTitle className=' w-full text-xl tracking-wide font-semibold text-neutral-800 text-center'>
           Sign up Form
       </CardTitle>
       <CardDescription className=' text-center'>
          Get registered today
       </CardDescription>
    </CardHeader>
    <CardContent>
      <div className=' w-full relative p-2'>
        <Form {...form}>
             <form action="" onSubmit={form.handleSubmit(onSubmit)}
                 className=' space-y-2'
                >
               <FormField
                 name='name'
                 control={form.control}
                render={({field})=>(
                 <FormItem>
                    <FormLabel className=' font-semibold'>
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input
                           type='text'
                            placeholder='john'
                            {...field}
                            />
                    </FormControl>
                 </FormItem>
                )}
                />
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
                            type='email'
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
                <div className=' w-full flex items-center justify-center flex-col gap-y-2'>
                    <Button 
                    className='  font-semibold hover:opacity-75'
                     type='submit'
                     variant="outline"
                    >
                      Submit
                    </Button>
                    <a href="/auth/sign-in" className=' text-sm hover:underline
                     text-zinc-700 hover:text-zinc-800/95 cursor-pointer font-semibold'>
                      Already have an account?
                    </a>
                </div>
             </form>
        </Form>
      </div>
    </CardContent>
   </Card>
  )
}
