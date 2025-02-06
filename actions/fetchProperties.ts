import { db } from "@/lib/prismadb"
import { serverUser } from "@/lib/serverUser"

export const fetchPropertiesManagement = async () => {
    const user = await serverUser()
    if(!user) return []
     try {
         const listings  = await db.listing.findMany({
            where:{
                userId:user?.id
            },
            include:{
                images:true,
                amenities:true,
                status:true,
                category:true,
                type:true,
                enquiries:true,
                location:true
            }
         })
         return listings
     } catch (error) {
        console.error(error)
        return []
     }
}