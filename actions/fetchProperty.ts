import { prisma } from "@/lib/prisma"


export async function fetchListing(propertyId: string, ownerId?: string){
    try {
        if (!propertyId) return null;

        const where: { id: string; userId?: string } = { id: propertyId };
        if (ownerId) {
            where.userId = ownerId;
        }

        const listing = await prisma.listing.findFirst({
            where,
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
