import { z } from "zod";

export const createListingSchema = z.object({
    title: z.string().min(3),
    description: z.string(),
    videoUrl: z.string().optional(),
    priceType: z.enum(["purchase", "rental"]),
    purchasePrice: z.number().nullable().optional(),
    rentalPrice: z.number().nullable().optional(),
    locationId: z.string().min(1),
    statusId: z.string().optional(),
    typeId: z.string().min(1),
    categoryId: z.string().min(1),
    images: z.array(z.object({
        url: z.string().min(1)
    })).min(1).max(10),
    bedrooms: z.coerce.number().min(1),
    bathrooms: z.coerce.number().min(1),
    area: z.coerce.number().min(1),

    amenities: z.array(z.string()).min(1, "Select at least one amenity"),
    // isFeatured: z.boolean().default(false).optional(),
}).superRefine((data, ctx) => {
    if (data.priceType === "purchase") {
        if (!data.purchasePrice || data.purchasePrice <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "You must provide a valid purchase price",
                path: ["purchasePrice"],
            });
        }
    } else {
        if (!data.rentalPrice || data.rentalPrice <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "You must provide a valid rental price",
                path: ["rentalPrice"],
            });
        }
    }
});