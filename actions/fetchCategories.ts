import { prisma } from "@/lib/prisma"

export async function fetchCategories() {
    try {
        const categories = await prisma.category.findMany()
        return categories
    } catch (error) {
        console.error("Error fetching categories:", error)
        throw error
    }
}
