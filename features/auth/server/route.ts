import { Hono } from "hono";
import {zValidator} from '@hono/zod-validator'
import {z} from 'zod'
import { getUserByEmail } from "@/lib/getUser";
import bcrypt from 'bcryptjs'
import {db} from '@/lib/prismadb'
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
const app = new Hono()

.post('/register',
    zValidator("json",z.object({
        email:z.string().email(),
        password:z.string().min(8),
        name:z.string().min(3)
    })),
    async(c)=>{
    const {email,password,name} = c.req.valid('json')
     const exisistingUser = await getUserByEmail(email)
     if(exisistingUser) return c.json({message:'User already exists'},400)
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await db.user.create({
        data:{
            email,
            hashedPwd:hashedPassword,
            name
        }
    })
    return c.json({message:'User created successfully',user:newUser},201)
})
.post('/login',
    zValidator("json",z.object({
        email:z.string().email(),
        password:z.string().min(8)
    })),
    async(c)=>{
     const {email,password  } = c.req.valid('json')
     const user = await getUserByEmail(email)
     if(!user) return c.json({message:'User not found'},404)
     try {
          await signIn("credentials",{
            email,
            password,
          })
          return c.json({message:'User logged in successfully'},200)
     } catch (error) {
         if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return c.json({message:'Invalid credentials'},401)
                case 'AccessDenied':
                    return c.json({message:"Access denied"},403)
                case 'ErrorPageLoop':
                    return c.json({message:"Error page loop"},400)
                case 'MissingSecret' :
                    return c.json({message:"Missing secret"},400)
                default:
                    return c.json({message:"Something went wrong"},500)
            }
         }
     }
    }
)
.delete('/delete/:id',async(c)=>{
    const {id} = c.req.param()
    const user = await db.user.delete({
        where:{id}
    })
    return c.json({message:"User deleted successfully",user},200)
})  
export default app;
