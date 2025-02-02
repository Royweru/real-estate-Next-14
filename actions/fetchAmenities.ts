import { prisma } from "@/lib/prisma"

export async function fetchAmenities() {
    try {
        const amenities = await prisma.amenity.findMany()
        return amenities
    } catch (error) {
        console.error("Error fetching amenities:", error)
        throw error
    }
}