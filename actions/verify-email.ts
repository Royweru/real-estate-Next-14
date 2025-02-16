"use server"
import {  getVerificationTokenByToken } from '@/lib/getVerificationToken'
import { db } from '@/lib/prismadb'

export const verifyEmail = async (token:string) => {
 const existingToken = await getVerificationTokenByToken(token)
 if(!existingToken) return {error:"We could not verify email"}

 if(new Date(existingToken.expires)<new Date()){
    return {error:"The token has already expired !"}
 }
 if(!existingToken.email){
    return {error:"No email has been found"}
 }

    await db.user.update({
        where:{
            email:existingToken.email
        },
        data:{
            emailVerified:new Date()
        }
     })
     return{success:"Email has been successfully verified"}

}