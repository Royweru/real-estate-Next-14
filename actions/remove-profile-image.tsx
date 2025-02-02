"use server"
import { db } from "@/lib/prismadb";

export const RemoveProfileImage = async(userId:string) => {
    try {
        await db.user.update({
            where:{id:userId},
            data:{image:null}
        })
        return true
    } catch (error) {
        console.error(error)
        return false
    }   
}
