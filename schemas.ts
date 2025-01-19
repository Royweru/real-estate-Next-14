import * as z from 'zod'


export const LoginSchema = z.object({
    email:z.string().min(3,{
        message:"email is required"
    }),
    password:z.string().min(1,{
        message:"Password should have at least 1 character"
    })
})
export const SignupSchema = z.object({
    email:z.string().min(3,{
        message:"Message is required"
    }),
    name:z.string().min(3,{
        message:"Message is required"
    }),
    password:z.string().min(8,{
       message:"Password should have at least 8 characters"
    }),
    confirmPassword:z.string().min(8,{
       message:"Password should have at least 8 characters"
    }),
    phoneNumber:z.coerce.number().optional(),
})

