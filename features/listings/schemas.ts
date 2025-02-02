import { z } from "zod";

export const createListingSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    videoUrl: z.string().optional(),
    priceType: z.enum(["purchase", "rental"]),
    purchasePrice: z.number().nullable().optional(),
    rentalPrice: z.number().nullable().optional(),
    locationId: z.string().min(1),
    statusId: z.string().min(1),
    typeId: z.string().min(1),
    categoryId: z.string().min(1),
    images: z.array(z.object({
        url: z.string().min(1)
    })).min(1).max(10),
    bedrooms: z.number().min(1),
    bathrooms: z.number().min(1),
    area: z.number().min(1),
    amenities: z.array(z.object({
        id: z.string(),
        name: z.string()
    })).min(1, "Select at least one amenity"),
    isFeatured: z.boolean().default(false).optional(),
}).refine((data) => {
    if (data.priceType === "purchase") {
        return data.purchasePrice && data.purchasePrice > 0;
    } else {
        return data.rentalPrice && data.rentalPrice > 0;
    }
}, {
    message: "You must provide a valid price for the selected price type",
    path: ["purchasePrice", "rentalPrice"]
});