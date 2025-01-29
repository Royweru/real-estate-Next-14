import { db } from "@/lib/prismadb"

export const fetchStatus = async()=>{
    try {
        const status = await db.status.findMany()
        return status
    } catch (error) {
        console.error(error)
        return []
    }
}
