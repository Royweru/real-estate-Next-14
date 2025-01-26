import { db } from "@/lib/prismadb"
export const FetchTypes = async() => {
    try {
        const types = await db.type.findMany({
             include:{
                properties:true
             }
        })
        return types
    } catch (error) {
        console.log(error)
        return []
    }
}
