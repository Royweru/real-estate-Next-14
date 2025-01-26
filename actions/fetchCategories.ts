import { db } from "@/lib/prismadb"


export const fetchCategories = async() => {
    try {
        const categories = await db.category.findMany({
            include:{
                properties:true
            }
        })
        return categories
    } catch (error) {
        console.error(error)
        return []
    }
}
