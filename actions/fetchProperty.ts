import { prisma } from "@/lib/prisma"


export async function fetchListing(propertyId: string){
    try {
        if (!propertyId) return null;

        const listing = await prisma.listing.findUnique({
            where: {
                id: propertyId
            },
            include: {
                images: true,
                amenities: true,
                status: true,
                location: true,
                category: true,
                type: true,
                
            }
        });
        return listing;
    } catch (error) {
        console.error("Error fetching listing:", error);
        return null;
    }
}