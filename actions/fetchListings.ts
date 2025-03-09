"use server"
import { db } from "@/lib/prismadb"

export const FetchListings = async () => {
     try {
         const res = await db.listing.findMany({
            include: {
                images: true,
                amenities: true,
                status: true,
                location: true,
                category: true,
               type: true,     
            }
         })
         return res
     } catch (error) {
        console.error(error)
        return []
     }
}