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
    rentalPrice:number |null;
    purchasePrice:number| null;
    priceType:string;
    area: number;
    images: ImageType[];
    amenities: Amenity[];
    status: Status;
    type:Type
    category: Category;
    location: Location;
} | null


export interface LocationWithListingsProps {
  id: string;
  county: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  properties: {
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
    bathrooms: number;
    area: number;
    images: { id: string; url: string }[];
    amenities: { id: string; name: string }[];
    priceType: string;
    purchasePrice: number | null;
    rentalPrice: number | null;
  }[];
}