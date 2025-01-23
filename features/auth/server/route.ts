import { Hono } from "hono";
import {zValidator} from '@hono/zod-validator'
import {z} from 'zod'
import { getUserByEmail } from "@/lib/getUser";
import bcrypt from 'bcryptjs'
import {db} from '@/lib/prismadb'
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

export default app;
