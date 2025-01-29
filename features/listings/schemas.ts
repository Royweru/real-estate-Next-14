import { z } from "zod";

export const createListingSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().min(1),
    locationId: z.string().min(1),
    statusId: z.string().min(1),
    typeId: z.string().min(1),
    categoryId: z.string().min(1),
    images:z.array(z.object({
        url:z.string().min(1)
    })).min(1).max(10),
    bedrooms:z.number().min(1),
    bathrooms:z.number().min(1),
    area:z.number().min(1),
    amenities:z.array(z.string()).min(1),
    purchasePrice:z.number().min(1).optional(),
    rentalPrice:z.number().min(1).optional(),
     isFeatured:z.boolean().default(false).optional(),
})