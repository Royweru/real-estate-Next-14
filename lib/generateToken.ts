"use server"
import { getVerificationTokenByEmail } from '@/lib/getVerificationToken'
import { db } from '@/lib/prismadb'
import  {v4 as uuidv4} from 'uuid'

export const generateToken =  async (email:string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 *1000)
    const exisitingToken = await getVerificationTokenByEmail(email)
    if(exisitingToken) {
        await  db.verificationToken.delete({
            where:{
                id:exisitingToken.id
            }
        })
    } 
    const verificationToken = await db.verificationToken.create({
        data:{
            token,
            expires,
            email
        }  
    })
    return verificationToken
}