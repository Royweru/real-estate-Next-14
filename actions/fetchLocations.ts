import { prisma } from "@/lib/prisma";

export async function fetchLocations() {
  try {
    const locations = await prisma.location.findMany({
     
      include: {
        properties: {
          include: {
            images: true,
            amenities: true,
            status: true,
            category: true,
            type: true,
          },
        },
      },
    });
    return locations.map(location => ({
      id: location.id,
      county: location.county,
      city: location.city,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
      properties: location.properties.map(property => ({
        id: property.id,
        userId: property.userId,
        locationId: property.locationId,
        typeId: property.typeId,
        categoryId: property.categoryId,
        statusId: property.statusId,
        title: property.title,
        description: property.description,
        videoUrl: property.videoUrl,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        images: property.images,
        amenities: property.amenities,
        priceType: property.priceType,
        purchasePrice: property.purchasePrice,
        rentalPrice: property.rentalPrice,
      })),
    }));
  } catch (error) {
    console.error("Error fetching locations with listings:", error);
    throw error;
  }
}

