"use server"

import { db } from "@/lib/prismadb"

export const uploadProfileImage = async (userId:string,imageUrl:string)=>{
    try {
        const res = await db.user.update({
            where:{id:userId},
            data:{
                image:imageUrl
            }
        })
        return res
    } catch (error) {
        console.error("Error uploading profile image:",error)
        throw error
    }
}