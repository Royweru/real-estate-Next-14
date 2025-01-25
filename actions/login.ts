"use server"

import { signIn } from "@/auth";
import { LoginSchema } from "@/features/auth/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";



export const Login = async (vals:z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(vals);
    if(!validatedFields.success) return {error:"Invalid fields"}

    const {email,password} = validatedFields.data
    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo:'/'
        })
        return {message:"Succesfully logged in !"}
    } catch (err) {
       if(err instanceof AuthError){
        switch(err.type){
            case 'CredentialsSignin' :
                return {error:"Invalid credentials"}
            case "AccessDenied":
                return {error:"Access denied"}
            case "InvalidCallbackUrl":
                return {error:"Invalid call back url"}
            case "JWTSessionError":
                return {error:"JWT session error"}
            case "MissingSecret" :
                return {error:"Missing secret"}
        }   
       } 
    } 
}

