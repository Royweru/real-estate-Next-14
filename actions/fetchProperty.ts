import { prisma } from "@/lib/prisma"
import { Listing,Image  as ImageType,Category,Location,Amenity,Status } from "@prisma/client"


export async function fetchListing(propertyId: string): Promise<{
    id: string;
    userId: string;
    locationId: string;
    typeId: string;
    categoryId: string;
    statusId: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    bedrooms: number;
    area: number;
    images: ImageType[];
    amenities: Amenity[];
    status: Status;
    category: Category;
    location: Location;
} | null> {
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