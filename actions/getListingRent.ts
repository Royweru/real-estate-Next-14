import { db } from "@/lib/prismadb"
export const GetListingsRent = async () => {
    try {
         const res = await db.listing.findMany({
            where:{
                category:{
                    name:"Rent"
                }
            },
            include:{
                images:true,
                amenities:true,
                status:true,
                category:true,
                type:true,
                location:true
            }
         })
         return res
    } catch (error) {
        console.error(error)
        return []
    }
}