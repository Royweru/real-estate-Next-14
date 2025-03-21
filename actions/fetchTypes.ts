import { prisma } from "@/lib/prisma";

export async function FetchTypes() {
  try {
    const types = await prisma.type.findMany({
      include: {
        properties: {
          include: {
            images: true,
           
          },
        },
      },
    });
    const modifiedTypes = types.map((type)=>{
      return {
        ...type,
        properties: type.properties.map((property)=>({
          ...property,
          images: property.images.map((image)=>image.url),
          
        })),
        propertiesCount: type.properties.length
      }
    })
    return modifiedTypes;
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
}
