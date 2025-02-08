import { Amenity, Category, Image as ImageType, Location, Status, Type } from "@prisma/client"

export type ListingType = {
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
    bathrooms:number;
    rentalPrice:number;
    purchasePrice:number;
    priceType:string;
    area: number;
    images: ImageType[];
    amenities: Amenity[];
    status: Status;
    type:Type
    category: Category;
    location: Location;
} | null

