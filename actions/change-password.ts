"use server"


import bcrypt from "bcryptjs"
import { db } from "@/lib/prismadb"

export async function ChangePassword(userId:string,newPassword:string){
    try {
        const hashedPassword = await bcrypt.hash(newPassword,10)
        const res = await db.user.update({
            where:{id:userId},
            data:{hashedPwd:hashedPassword}
        })
        return res
    } catch (error) {
        console.error("Error changing password:",error)
         throw new Error("Something went wrong while trying to change password")
    }
}